const Task = require("../models/Task");
const File = require('../models/File');
const Plot = require('../models/Plot');

const asyncHandler = require('express-async-handler')
const multer = require("multer");
const {parseLogFile, getCommitAndRepo, calculateHash} = require("../helpers/helpers");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const saveTaskToServer = (newTaskMeta) => {
    const taskDir = 'public/' + newTaskMeta.id;
    fs.mkdir(taskDir, err => {
        if (err) console.log(err);
    });
    fs.openSync(`${taskDir}/log.txt`, 'w');
}

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: fileStorageEngine});

const postAddTask = async (req, res) => {
    const source = req.body.source;
    const {repository, commit} = getCommitAndRepo(source);

    const args = req.body.arguments;
    const dependencies = [];

    for (let arg of args) {
        const value = arg.split('=')[1];
        if (value.includes('@')) {
            const dependencyLabel = value.substring(value.indexOf('@') + 1);
            let task;
            if (dependencyLabel.length === 40) { // check if dependency is hash
                task = await Task.findOne({hash: dependencyLabel});
            }
            else {
                task = await Task.findOne({tag: dependencyLabel});
            }
            task.isDependency = true;
            task.save();
            dependencies.push(task.id);
        }
    }

    const taskToHash = {
        arguments: args,
        commit: commit,
        dependencies: dependencies,
        entrypoint: req.body.entrypoint,
        repository: repository,
    };

    const hash = calculateHash(taskToHash);

    const newTaskMeta = new Task({
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
    newTaskMeta.save();

    File.create({
        task: newTaskMeta.id,
        metadataPath: `${newTaskMeta.id}/log.txt`,
        size: 0
    });

    saveTaskToServer(newTaskMeta);
    return res.status(201).json(newTaskMeta);
};

const getAllTasks = async (req, res) => {
    const status = req.query.status;
    const sort = req.query.sort;

    if (status) {
        if (sort === 'asc') {
            const tasks = await Task.find({user: req.user.id, status: status}).sort({created: 1});
            return res.status(200).json(tasks);
        }

        if (sort === 'desc') {
            const tasks = await Task.find({user: req.user.id, status: status}).sort({created: -1});
            return res.status(200).json(tasks);
        }

        const tasks = await Task.find({user: req.user.id, status: status});
        return res.status(200).json(tasks);
    }
    if (sort === 'asc') {
        const tasks = await Task.find({user: req.user.id}).sort({created: 1});
        return res.status(200).json(tasks);
    }

    if (sort === 'desc') {
        const tasks = await Task.find({user: req.user.id}).sort({created: -1});
        return res.status(200).json(tasks);
    }

    const tasks = await Task.find({user: req.user.id});
    res.status(200).json(tasks);
};

const getTask = async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    res.status(200).json(task);
}

const deleteTask = asyncHandler(async (req, res) => {
    const id = req.params.taskId;
    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({message: 'Task not found'});
    }

    if (!req.user) {
        return res.status(401).json('User not found!');
    }

    if (task.user.toString() !== req.user.id) {
        return res.status(401).json('User not authorized');
    }

    await task.remove()
    fs.rmdirSync(`public/${id}`, { recursive: true });
    res.status(200).json({id: id})
});

const findByTag = (req, res) => {
    const tag = req.query.tag;
    Task.find({user: req.user.id , tag: tag})
        .then(task => {
            return res.status(200).json(task[0]);
        })
        .catch(err => console.log(err));
}

const putUpdateTag = async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    task.tag = req.body.tag;
    task.updated = Date.now();
    task.save();
    res.status(200).json(task);
}

function generateAccessToken(task) {
    return jwt.sign(task, process.env.JWT_SECRET, {
        expiresIn: '120000'
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

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, task) => {
        if (err) return res.status(403).json(err);
        const accessToken = generateAccessToken({task: task.taskId});
        res.status(200).json({accessToken: accessToken});
    })
}

const lockTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        return res.status(400).json({message: 'Please provide taskId'});
    }

    const taskToLock = await Task.findById(taskId);
    taskToLock.locked = true;
    taskToLock.save();
    setTimeout(() => {
        taskToLock.locked = false;
        taskToLock.save();
    }, 180000);

    const task = { task: taskId };
    const accessToken = generateAccessToken(task);

    const refreshToken = jwt.sign(task, process.env.JWT_SECRET);
    refreshTokens.push(refreshToken);

    return res.status(201).json({
        accessToken: accessToken,
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

    const task = await Task.findById(taskId);

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
            const filePaths = files.map(file => file.metadataPath);
            const fileNames = [];
            for (const path of filePaths) {
                const splittedPath = path.split('/');
                fileNames.push(splittedPath[splittedPath.length - 1]);
            }
            res.status(200).json(fileNames);
        })
        .catch(err => res.status(400).json(err));
};

const postLogData = async (req, res) => {
    const logData = req.body.logData;
    const taskId = req.params.taskId;

    const regex = /^[a-z_]+: [+-]?[0-9]*\.?[0-9]*$/;

    for (let line of logData) {
        if (regex.test(line)) {
            const splitted = line.split(':');
            const key = splitted[0];
            const value = parseFloat(splitted[1].trim());

            const plot = await Plot.findOne({name: key, task: taskId});
            if (!plot) {
                const newPlot = await Plot.create({
                    task: taskId,
                    name: key,
                    data: [value],
                });
            }
            else {
                plot.data.push(value)
                await plot.save();
            }
        }
        fs.appendFile(`public/${taskId}/log.txt`, line + '\n', err => console.log('Append line'));
    }

    res.status(200).json(logData);
};

const getDataToPlot = async (req, res) => {
    const taskId = req.params.taskId;
    const dataToPlot = await parseLogFile(`public/${taskId}/log.txt`);
    res.status(200).json(dataToPlot);
};

const postSetStatus = async (req, res) => {
    const newStatus = req.body.status;
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    task.status = newStatus;
    task.updated = Date.now();
    task.save();

    res.status(200).json(task);
};

const getPlots = async (req, res) => {
    const taskId = req.params.taskId;

    Plot.find({task: taskId})
        .then(plots => res.status(200).json(plots));
};

const resetTask = async (req, res) => {
    const taskId = req.params.taskId;
    const clear = req.query.clear;
    const task = await Task.findById(taskId);
    task.status = 'PENDING';
    task.save();

    if (clear === 'yes') {
        fs.writeFile(`public/${taskId}/log.txt`, '', () => console.log('log.txt cleared'))

        // TODO Remove files in public
        // Remove files
        const files = await File.find({task: taskId});
        for (let file of files) {
            fs.unlink(file.metadataPath, err => {
                console.log(err);
            })
        }

        await File.deleteMany({task: taskId});
    }

    // Remove plots
    await Plot.deleteMany({task: taskId});

    res.status(200).json(task);
};

module.exports = {
    postAddTask,
    getTask,
    deleteTask,
    getAllTasks,
    lockTask,
    unlockTask,
    putUpdateTag,
    findByTag,
    upload,
    uploadFiles,
    getUploadedFiles,
    postLogData,
    getDataToPlot,
    postSetStatus,
    getPlots,
    refreshToken,
    getUploadedFileNames,
    resetTask,
}