const Run = require('../models/Run');
const lockfile = require('proper-lockfile');
const Environment = require('../classes/Environment.js');
const fs = require('fs');

const RUNS_DIR = 'runs';

const saveRun = (newRunMeta) => {
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
  Run.find()
      .then(runs => {
          if (!runs) {
              return res.status(404).json({message: 'No runs found!'});
          }
          return res.status(200).json(runs);
      })
      .catch(err => console.log(err));
};

const getRun = (req, res) => {
    const id = req.params.idRun;
    if (!id) {
        return res.status(404).json({message: 'Id not provided'});
    }
    Run.findById(id).then(run => {
        return res.status(200).json(run);
    })
}

const deleteRun = (req, res) => {
    const id = req.params.idRun;
    if (!id) {
        return res.status(404).json({message: 'Id not provided'});
    }

    fs.rmSync(`runs/${id}`,{recursive: true, force: true});

    Run.findByIdAndRemove(id).exec(error => {
        if (error) {
            return res.status(500).json(error);
        }
        console.log("delete");
        return res.status(204).json({message: 'deleted'});
    });
}

const postAddRun = (req, res) => {
    const newRun = {
       source: req.body.source,
       entrypoint: req.body.entrypoint,
       arguments: req.body.arguments,
       tags: req.body.tags,
       force: req.body.force,
    };

    const env = new Environment(newRun.source);
    /*
    if (!env.entrypoints.contains(newRun.entrypoint)) {
        throw new Error('Entry point not found.');
    }
     */

    lockfile.lock(RUNS_DIR)
        .then((release) => {
            const newRunMeta = new Run({
                repository: env.repository,
                commit: env.commit,
                entrypoint: newRun.entrypoint,
                arguments: newRun.arguments,
                status: 'PENDING',
                // command: {type: String},
                created: Date.now(),
                updated: Date.now(),
            });
            newRunMeta.save();

            saveRun(newRunMeta);
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
    getAllRuns
}