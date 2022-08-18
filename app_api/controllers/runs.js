const Run = require('../models/Run');

const lockfile = require('proper-lockfile');
const Environment = require('../classes/Environment.js');
const asyncHandler = require('express-async-handler')
const File = require("../models/File");
const multer = require("multer");
const {parseLogFile} = require("../helpers/helpers");
const fs = require("fs");

const RUNS_DIR = 'runs';
const LOCK_TIME = 10000;

const saveRunToServer = (newRunMeta) => {
    const runDir = RUNS_DIR + '/' + newRunMeta.id;
    fs.mkdir(runDir, err => {
        if (err) console.log(err);
    });
    const jsonMeta = JSON.stringify(newRunMeta);
    fs.writeFile(`${runDir}/meta.json`, jsonMeta, 'utf-8', err => {
        if (err) console.log(err);
    });
    fs.writeFile(`${runDir}/log.txt`, '', 'utf-8', err => {
        if (err) console.log(err);
    });
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

const putUpdateRun = async (req, res) => {
    const runId = req.params.taskId
    if (!runId) {
        return res.status(404).json({message: 'TaskId not provided'})
    }

    const run = await Run.findById(runId);

    if (!run) {
        return res.status(404).json({message: 'Task not found'});
    }

    if (!req.user) {
        return res.status(401).json('User not found!');
    }

    if (run.user.toString() !== req.user.id) {
        console.log(run.user.toString(), req.user.id)
        return res.status(401).json('User not authorized');
    }

    run.repository = req.body.source
    run.commit = req.body.commit
    run.entrypoint = req.body.entrypoint
    run.arguments = req.body.arguments
    run.tag = req.body.tag
    run.updated = Date.now()
 
    run.save((err, run) => {
        if (err) {
            return res.status(404).json(err)
        }
        else {
            res.status(200).json(run)
        }
    }) 
}

const calculateHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

const postAddRun = async (req, res) => {
    const newRun = {
       source: req.body.source,
       entrypoint: req.body.entrypoint,
       arguments: req.body.arguments,
       tag: req.body.tag,
       force: req.body.force,
       user: req.user.id
    };

    const env = new Environment(newRun.source);

    const args = newRun.arguments;
    const dependencies = [];

    for (let arg of args) {
        const value = arg.split('=')[1];
        if (value.includes('@')) {
            const dependencyTag = value.substring(value.indexOf('@') + 1);
            const run = await Run.findOne({tag: dependencyTag});
            dependencies.push(run.hash);
        }
    }

    const hash = calculateHash(req.body.arguments + env.commit);

    const newRunMeta = new Run({
        user: newRun.user,
        repository: env.repository,
        commit: env.commit,
        entrypoint: newRun.entrypoint,
        arguments: args,
        status: 'PENDING',
        created: Date.now(),
        updated: Date.now(), 
        tag: newRun.tag,
        dependencies: dependencies,
        hash: hash
    });
    newRunMeta.save();


    saveRunToServer(newRunMeta);
    return res.status(201).json(newRunMeta);
};

const isLocked = (req, res) => {
    const taskId = req.params.taskId;
    lockfile.check(RUNS_DIR + '/' + taskId)
        .then((isLocked) => {
            if (isLocked) {
                res.status(200).json({locked: true});
            }
            else {
                res.status(200).json({locked: false});
            }
        })
        .catch(err => {
            return res.status(400).json(err)
        })
}

const lockRun = async (req, res) => {
    const taskId = req.params.taskId;
    const taskToLock = await Run.findById(taskId);

    if (taskToLock.locked) {
        return res.status(200).json({msg: `Task ${taskId} already locked.`});
    }

    taskToLock.locked = true;
    taskToLock.save();
    console.log('locked');

    setTimeout(() => {
        taskToLock.locked = false;
        taskToLock.save();
        console.log('unlocked');
    }, LOCK_TIME);

    res.status(200).json({msg: `Task ${taskId} locked for ${LOCK_TIME / 1000} seconds.`});
}

const unlockRun = async (req, res) => {
    const taskId = req.params.taskId 
    const taskToUnlock = await Run.findById(taskId);

    if (!taskToUnlock.locked) {
        return res.status(200).json({msg: 'Task not locked.'});
    }

    taskToUnlock.locked = false;
    taskToUnlock.save();
    res.status(200).json({msg: `Task ${taskId} unlocked.`});
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

const postLogData = (req, res) => {
    const logData = req.body.logData;
    const taskId = req.params.taskId;

    fs.appendFile(`${RUNS_DIR}/${taskId}/log.txt`, logData, err => console.log(err));

    res.status(200).json(logData);
};

const getDataToPlot = async (req, res) => {
    const taskId = req.params.taskId;
    const dataToPlot = await parseLogFile(`${RUNS_DIR}/${taskId}/log.txt`);
    res.status(200).json(dataToPlot);
};

module.exports = {
    postAddRun,
    getRun,
    deleteRun,
    getAllRuns,
    lockRun,
    unlockRun,
    putUpdateRun,
    findByTag,
    isLocked,
    upload,
    uploadFiles,
    getUploadedFiles,
    postLogData,
    getDataToPlot,
}