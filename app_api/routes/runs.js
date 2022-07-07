const express = require('express');
const router = express.Router();

const ctrlRuns = require('../controllers/runs');

const {protect} = require('../middleware/auth')

router.post('/runs', protect, ctrlRuns.postAddRun);

router.post('/runs/reset/:runId', ctrlRuns.postResetRun);

router.post('/runs/status/:runId/:status', ctrlRuns.postStatus);

router.post('/runs/lock/:runId', ctrlRuns.lockRun);

router.post('/runs/unlock/:runId', ctrlRuns.unlockRun);

router.get('/runs/:runId', protect, ctrlRuns.getRun);

router.get('/runs', protect, ctrlRuns.getAllRuns);

router.delete('/runs/:runId', protect, ctrlRuns.deleteRun);

module.exports = router;