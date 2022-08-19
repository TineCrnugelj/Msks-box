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

router.post('/tasks/:taskId/files', ctrlRuns.upload.array('files', 10), ctrlRuns.uploadFiles);

router.get('/tasks/:taskId/files', ctrlRuns.getUploadedFiles);

router.post('/tasks/:taskId/log', ctrlRuns.postLogData);

router.get('/tasks/:taskId/dataToPlot', ctrlRuns.getDataToPlot);

router.post('/tasks/:taskId/status', ctrlRuns.postSetStatus);

module.exports = router;