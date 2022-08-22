const Run = require('../models/Run');
const File = require('../models/File');
const Plot = require('../models/Plot');

const lockfile = require('proper-lockfile');
const asyncHandler = require('express-async-handler')
const multer = require("multer");
const {parseLogFile, getCommitAndRepo, calculateHash} = require("../helpers/helpers");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const http = require('http');
const Task = require("../models/Run");

const RUNS_DIR = 'tasks';

const saveRunToServer = (newRunMeta) => {
    const runDir = RUNS_DIR + '/' + newRunMeta.id;
    fs.mkdir(runDir, err => {
        if (err) console.log(err);
    });
    fs.openSync(`${runDir}/log.txt`, 'w');
}

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: fileStorageEngine});

const postAddRun = async (req, res) => {
    const source = req.body.source;
    const {repository, commit} = getCommitAndRepo(source);

    const args = req.body.arguments;
    const dependencies = [];

    for (let arg of args) {
        const value = arg.split('=')[1];
        if (value.includes('@')) {
            const dependencyTag = value.substring(value.indexOf('@') + 1);
            const run = await Run.findOne({tag: dependencyTag});
            dependencies.push(run.hash);
        }
    }

    const taskToHash = {
        arguments: args, // popravi
        commit: commit,
        dependencies: dependencies,
        entrypoint: req.body.entrypoint,
        repository: repository,
    };

    const hash = calculateHash(taskToHash);

    const newRunMeta = new Run({
        user: req.user.id,
        repository: repository,
        commit: commit,
        entrypoint: req.body.entrypoint,
        arguments: args,
        created: Date.now(),
        updated: Date.now(),
        tag: req.body.tag,
        dependencies: dependencies,
        hash: hash
    });
    newRunMeta.save();

    saveRunToServer(newRunMeta);
    return res.status(201).json(newRunMeta);
};

const getAllRuns = (req, res) => {
    Run.find({user: req.user.id})
        .then(runs => {
            if (!runs) {
                return res.status(404).json({message: 'No runs found!'});
            }
            return res.status(200).json(runs);
        })
        .catch(err => console.log(err));
};

const getRun = (req, res) => {
    const hash = req.params.hash;
    if (!hash) {
        return res.status(404).json({message: 'Hash not provided'});
    }
    Run.findOne({hash: hash}).then((run) => {
        return res.status(200).json(run);  
    })
}

const deleteRun = asyncHandler(async (req, res) => {
    const id = req.params.taskId;
    const run = await Run.findById(id);

    if (!run) {
        return res.status(404).json({message: 'Run not found'});
    }

    if (!req.user) {
        return res.status(401).json('User not found!');
    }

    if (run.user.toString() !== req.user.id) {
        return res.status(401).json('User not authorized');
    }

    // fs.rmdirSync(`${RUNS_DIR}/${id}`, { recursive: true });

    await run.remove()
    res.status(200).json({id: id})
});

const findByTag = (req, res) => {
    const tag = req.query.tag;
    Run.find({user: req.user.id , tag: tag})
        .then(run => {
            return res.status(200).json(run[0]);
        })
        .catch(err => console.log(err));
}

const putUpdateTag = async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Run.findById(taskId);

    task.tag = req.body.tag;
    task.updated = Date.now();
    task.save();
    res.status(200).json(task);
}

const isLocked = async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Run.findById(taskId);

    res.status(200).json({locked: task.locked});

}

const generateToken = (taskId) => {
    return jwt.sign({taskId}, process.env.JWT_SECRET, {
        expiresIn: '180000'
    });
}

let refreshTokens = [];

const refreshToken = async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        res.status(401).json({message: 'No refresh token provided'});
    }
    if (!refreshTokens.includes(refreshToken)) {
        res.status(403).json({message: 'Refresh token does not exist'});
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = generateToken(decoded.id);
    return res.status(200).json({accessToken: accessToken});
}

const lockTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        return res.status(400).json({message: 'Please provide taskId'});
    }

    const task = await Task.findById(taskId);
    task.locked = true;
    task.save();
    setTimeout(() => {
        task.locked = false;
        task.save();
    }, 180000);

    const refreshToken = jwt.sign({taskId}, process.env.JWT_SECRET);
    refreshTokens.push(refreshToken);

    return res.status(201).json({
        accessToken: generateToken(taskId),
        refreshToken: refreshToken,
        expiresIn: new Date(Date.now() + Date.UTC(70,0,0,2,3,0)).toISOString()
    });
});

const unlockTask = async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    if (!task.locked) {
        return res.status(200).json({message: 'Task not locked.'});
    }

    task.locked = false;
    task.save();

    res.status(200).json(task);
}


const uploadFiles = async (req, res) => {
    const files = req.files;
    const taskId = req.params.taskId;

    const task = await Run.findById(taskId);

    for (let file of files) {
        const newFile = File.create({
            task: task.id,
            metadataPath: file.path,
            size: file.size
        });
    }
    res.status(200).json({msg: 'Files uploaded'});
};

const getUploadedFiles = async (req, res) => {
    File.find({task: req.params.taskId})
        .then(files => {
            res.status(200).json(files);
        })
        .catch(err => res.status(400).json(err));
};

const getUploadedFileNames = async (req, res) => {
    File.find({task: req.params.taskId}, 'metadataPath')
        .then(files => {
            const fileNames = files.map(file => file.metadataPath.split('//'));
            res.status(200).json(fileNames);
        })
        .catch(err => res.status(400).json(err));
};

const postLogData = (req, res) => {
    const logData = req.body.logData;
    const taskId = req.params.taskId;

    for (let line of logData) {
        fs.appendFile(`${RUNS_DIR}/${taskId}/log.txt`, line + '\n', err => console.log('Append line'));
    }

    res.status(200).json(logData);
};

const getDataToPlot = async (req, res) => {
    const taskId = req.params.taskId;
    const dataToPlot = await parseLogFile(`${RUNS_DIR}/${taskId}/log.txt`);
    res.status(200).json(dataToPlot);
};

const postSetStatus = async (req, res) => {
    const newStatus = req.body.status;
    const taskId = req.params.taskId;
    const task = await Run.findById(taskId);
    task.status = newStatus;
    task.updated = Date.now();
    task.save();

    res.status(200).json(task);
};

const getPlots = async (req, res) => { // ADD TO SWAGGER
    const taskId = req.params.taskId;
    const dataToPlot = await parseLogFile(`${RUNS_DIR}/${taskId}/log.txt`);
    for (let key of Object.keys(dataToPlot)) {
        await Plot.create({
            task: taskId,
            name: key,
            data: dataToPlot[key],
        });
    }

    Plot.find({task: taskId})
        .then(plots => res.status(200).json(plots));
};

module.exports = {
    postAddRun,
    getRun,
    deleteRun,
    getAllRuns,
    lockTask,
    unlockTask,
    putUpdateTag,
    findByTag,
    isLocked,
    upload,
    uploadFiles,
    getUploadedFiles,
    postLogData,
    getDataToPlot,
    postSetStatus,
    getPlots,
    refreshToken,
    getUploadedFileNames,
}