const Run = require('../models/Run');
const User = require('../models/User');

const lockfile = require('proper-lockfile');
const Environment = require('../classes/Environment.js');
const fs = require('fs');
const asyncHandler = require('express-async-handler')


const RUNS_DIR = 'runs';

const saveRunToServer = (newRunMeta) => {
    const runDir = RUNS_DIR + '/' + newRunMeta.id;
    fs.mkdir(runDir, err => {
        if (err) console.log(err);
    });
    const jsonMeta = JSON.stringify(newRunMeta);

    fs.writeFile(`${runDir}/meta.json`, jsonMeta, 'utf-8', err => {
        if (err) console.log(err);
    });
}

const getAllRuns = (req, res) => {
    const searchQuery = req.query.query;
    if (!searchQuery) {
        Run.find({user: req.user.id})
            .then(runs => {
                if (!runs) {
                    return res.status(404).json({message: 'No runs found!'});
                }
                return res.status(200).json(runs);
            })
            .catch(err => console.log(err));
    }
    else {
        Run.find({user: req.user.id, tag: searchQuery})
            .then(runs => {
                if (!runs) {
                    return res.status(404).json({message: 'No runs found!'});
                }
                return res.status(200).json(runs);
            })
            .catch(err => console.log(err));
    }

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

    fs.rmSync(`runs/${id}`, {recursive: true, force: true});

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

const postResetRun = (req, res) => {
    const taskId = req.params.taskId;
    const remove = req.query.remove;

    lockfile.lock(RUNS_DIR)
        .then((release) => {
            if (remove) {
                deleteRun(req, res);
            }
            else {
                Run.findByIdAndUpdate(taskId, {'status': 'PENDING', 'updated': Date.now()}, (err, run) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    else {
                        run.status = 'PENDING';
                        console.log(run);
                        fs.writeFile(RUNS_DIR + '/' + taskId + '/meta.json', JSON.stringify(run), err => console.log(err));
                        return res.status(204).json(run);
                    }
                });
            }

            return lockfile.unlock(RUNS_DIR);
        })
    .catch(err => {
        console.log(err); 
    });
    
};

const postStatus = (req, res) => {
    const taskId = req.params.taskId;
    const status = req.params.status;

    Run.findByIdAndUpdate(taskId, {'status': status, 'updated': Date.now()}, (err, run) => {
        if (err) console.log(err);
        else {
            run.status = status;
            fs.writeFile(RUNS_DIR + '/' + taskId + '/meta.json', JSON.stringify(run), err => console.log(err));
            return res.status(204).json(run);
        }
    });
};

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

const lockRun = (req, res) => {
    const taskId = req.params.taskId;
    const taskToLock = RUNS_DIR + '/' + taskId;
    lockfile.lock(taskToLock)
        .then(() => {
            const timeout = setTimeout(() => {
                lockfile.unlock(taskToLock);
            }, 3000);
            res.status(200).json({id: taskId});

        })
        .catch(err => {
            return res.status(400).json(err)
        })
}

const unlockRun = (req, res) => {
    const taskId = req.params.taskId 
    lockfile.check(RUNS_DIR + '/' + taskId)
        .then((isLocked) => {
            if (isLocked) {
                lockfile.unlock(RUNS_DIR + '/' + taskId)
                .then(() => {
                    return res.status(200).json({id: taskId});
                })
                .catch(err => console.log(err))
            }
            else {
                return res.status(400).json({msg: 'Task is not locked'})
            }
        })
}
    


module.exports = {
    postAddRun,
    getRun,
    deleteRun,
    getAllRuns,
    postResetRun,
    postStatus,
    lockRun,
    unlockRun,
    putUpdateRun,
    findByTag,
    isLocked,
}