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
    const id = req.params.runId;
    if (!id) {
        return res.status(404).json({message: 'Id not provided'});
    }
    Run.findById(id).then((err, run) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(run);  
    })
}

const deleteRun = asyncHandler(async (req, res) => {
    const id = req.params.runId;
    const run = Run.findById(id);
    if (!id) {
        return res.status(404).json({message: 'Id not provided'});
    }

    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(401).json('User not found!');
    }

    if (run.user.toString() !== user.id) {
        return res.status(401).json('User not authorized');
    }

    fs.rmSync(`runs/${id}`, {recursive: true, force: true});

    Run.findByIdAndRemove(id).exec(error => {
        if (error) {
            return res.status(500).json(error);
        }
        return res.status(204).json({message: 'deleted'});
    });
})

const postResetRun = (req, res) => {
    const runId = req.params.runId;
    const remove = req.query.remove;

    lockfile.lock(RUNS_DIR)
        .then((release) => {
            if (remove) {
                deleteRun(req, res);
            }
            else {
                Run.findByIdAndUpdate(runId, {'status': 'PENDING', 'updated': Date.now()}, (err, run) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    else {
                        run.status = 'PENDING';
                        console.log(run);
                        fs.writeFile(RUNS_DIR + '/' + runId + '/meta.json', JSON.stringify(run), err => console.log(err));
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
    const runId = req.params.runId;
    const status = req.params.status;

    Run.findByIdAndUpdate(runId, {'status': status, 'updated': Date.now()}, (err, run) => {
        if (err) console.log(err);
        else {
            run.status = status;
            fs.writeFile(RUNS_DIR + '/' + runId + '/meta.json', JSON.stringify(run), err => console.log(err));
            return res.status(204).json(run);
        }
    });
};

const postAddRun = (req, res) => {
    const newRun = {
       source: req.body.source,
       entrypoint: req.body.entrypoint,
       arguments: req.body.arguments,
       tag: req.body.tag,
       force: req.body.force,
       user: req.user.id
    };

    const env = new Environment(newRun.source);

    shell.exec(`git clone ${newRun.source}`);
    /*
    if (!env.entrypoints.contains(newRun.entrypoint)) {
        throw new Error('Entry point not found.');
    }
     */


    lockfile.lock(RUNS_DIR)
        .then((release) => {
            const newRunMeta = new Run({
                user: newRun.user,
                repository: env.repository,
                commit: env.commit,
                entrypoint: newRun.entrypoint,
                arguments: newRun.arguments,
                status: 'PENDING',
                // command: {type: String},
                created: Date.now(),
                updated: Date.now(),
                tag: newRun.tag,
                // properties: newRun.tag,
            });
            newRunMeta.save();

            saveRunToServer(newRunMeta);
            res.status(201).json(newRunMeta);
            return lockfile.unlock(RUNS_DIR);
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    postAddRun,
    getRun,
    deleteRun,
    getAllRuns,
    postResetRun,
    postStatus,
}