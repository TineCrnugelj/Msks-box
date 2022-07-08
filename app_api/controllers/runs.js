const Run = require('../models/Run');
const User = require('../models/User');

const lockfile = require('proper-lockfile');
const Environment = require('../classes/Environment.js');
const fs = require('fs');
const shell = require('shelljs');
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
    const id = req.params.taskId;
    if (!id) {
        return res.status(404).json({message: 'Id not provided'});
    }
    Run.find({user: req.user.id, _id: id}).then((run) => {

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
    return res.status(204).json({message: 'Task deleted'})
})

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
    run.status = req.body.status
    run.tag = req.body.tag
    run.updated = Date.now()
 
    run.save((err, run) => {
        if (err) {
            return res.status(404).json(err)
        }
        else {
            res.status(204).json(run)
        }
    }) 
}

const postAddRun = (req, res) => {
    const newRun = { 
       source: req.body.source,
       entrypoint: req.body.entrypoint,
       arguments: req.body.arguments,
       tag: req.body.tag,
       force: req.body.force,
       user: req.user.id
    };

    console.log(newRun)

    const env = new Environment(newRun.source);

    const newRunMeta = new Run({
        user: newRun.user,
        repository: env.repository,
        commit: env.commit,
        entrypoint: newRun.entrypoint,
        arguments: newRun.arguments,
        status: 'PENDING',
        created: Date.now(),
        updated: Date.now(), 
        tag: newRun.tag,
    });
    newRunMeta.save();

    saveRunToServer(newRunMeta);
    return res.status(201).json(newRunMeta);
        
};

const lockRun = (req, res) => {
    const taskId = req.params.taskId;
    lockfile.lock(RUNS_DIR + '/' + taskId)
        .then(() => {
            // do something with the file
            return res.status(200).json({msg: `Task ${taskId} locked.`})
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
                    return res.status(200).json({msg: `Task ${taskId} unlocked.`})
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
}