const express = require('express');
const router = express.Router();

const ctrlRuns = require('../controllers/runs');

router.post('/runs', ctrlRuns.postAddRun);

router.get('/runs/:idRun', ctrlRuns.getRun);

router.get('/runs', ctrlRuns.getAllRuns);

router.delete('/runs/:idRun', ctrlRuns.deleteRun);

module.exports = router;