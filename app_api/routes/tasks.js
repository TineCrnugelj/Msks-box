const express = require('express');
const router = express.Router();

const ctrlRuns = require('../controllers/runs');

const {protect} = require('../middleware/auth');
const {locked} = require('../middleware/lock');

router.get('/tasks/find', protect, ctrlRuns.findByTag);

router.post('/tasks', protect, ctrlRuns.postAddRun);

router.post('/tasks/:taskId/lock', ctrlRuns.lockTask);

router.post('/tasks/:taskId/unlock', ctrlRuns.unlockTask);

router.get('/tasks/:hash', ctrlRuns.getRun);

router.get('/tasks', protect, ctrlRuns.getAllRuns);

router.delete('/tasks/:taskId', protect, ctrlRuns.deleteRun);

router.post('/tasks/:taskId/files', locked, ctrlRuns.upload.array('files', 10), ctrlRuns.uploadFiles);

router.get('/tasks/:taskId/files', ctrlRuns.getUploadedFiles);

router.get('/tasks/:taskId/fileNames', ctrlRuns.getUploadedFileNames);

router.post('/tasks/:taskId/log', locked, ctrlRuns.postLogData);

router.get('/tasks/:taskId/dataToPlot', ctrlRuns.getDataToPlot);

router.post('/tasks/:taskId/status', locked, ctrlRuns.postSetStatus);

router.put('/tasks/:taskId/tag', ctrlRuns.putUpdateTag);

router.post('/tasks/:taskId/reset', locked, ctrlRuns.resetTask);

router.get('/tasks/:taskId/plots', ctrlRuns.getPlots);

router.post('/token', ctrlRuns.refreshToken);

module.exports = router;