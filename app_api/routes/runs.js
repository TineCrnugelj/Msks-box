const express = require('express');
const router = express.Router();

const ctrlRuns = require('../controllers/runs');

router.post('/runs', ctrlRuns.postAddRun);

router.post('/runs/reset/:runId', ctrlRuns.postResetRun);

router.post('/runs/status/:runId/:status', ctrlRuns.postStatus);

router.get('/runs/:runId', ctrlRuns.getRun);

router.get('/runs', ctrlRuns.getAllRuns);

router.delete('/runs/:runId', ctrlRuns.deleteRun);

module.exports = router;