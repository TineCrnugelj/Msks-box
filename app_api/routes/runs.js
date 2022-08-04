const express = require('express');
const router = express.Router();

const ctrlRuns = require('../controllers/runs');

const {protect} = require('../middleware/auth');

router.get('/tasks/find', protect, ctrlRuns.findByTag);

router.post('/tasks', protect, ctrlRuns.postAddRun);

router.post('/tasks/:taskId/lock', ctrlRuns.lockRun);

router.post('/tasks/:taskId/unlock', ctrlRuns.unlockRun);

router.get('/tasks/:hash', ctrlRuns.getRun);

router.put('/tasks/:taskId', protect, ctrlRuns.putUpdateRun);

router.get('/tasks', protect, ctrlRuns.getAllRuns);

router.get('/tasks/isLocked/:taskId', protect, ctrlRuns.isLocked);

router.delete('/tasks/:taskId', protect, ctrlRuns.deleteRun);

module.exports = router;