const express = require('express');
const router = express.Router();

const ctrlRuns = require('../controllers/runs');

const {protect} = require('../middleware/auth')

router.get('/tasks/find', protect, ctrlRuns.findByTag);

router.post('/tasks', protect, ctrlRuns.postAddRun);

router.post('/tasks/reset/:taskId', ctrlRuns.postResetRun);

router.post('/tasks/status/:rutaskIdnId/:status', ctrlRuns.postStatus);

router.post('/tasks/lock/:taskId', ctrlRuns.lockRun);

router.post('/tasks/unlock/:taskId', ctrlRuns.unlockRun);

router.get('/tasks/:taskId', ctrlRuns.getRun);

router.put('/tasks/:taskId', protect, ctrlRuns.putUpdateRun);

router.get('/tasks', protect, ctrlRuns.getAllRuns);

router.get('/tasks/isLocked/:taskId', protect, ctrlRuns.isLocked);

router.delete('/tasks/:taskId', protect, ctrlRuns.deleteRun);

module.exports = router;