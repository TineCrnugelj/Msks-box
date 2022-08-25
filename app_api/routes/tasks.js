const express = require('express');
const router = express.Router();

const ctrlTasks = require('../controllers/tasks');

const {protect} = require('../middleware/auth');
const {locked} = require('../middleware/lock');

router.get('/tasks/find', protect, ctrlTasks.findByTag);

router.post('/tasks', protect, ctrlTasks.postAddTask);

router.post('/tasks/:taskId/lock', ctrlTasks.lockTask);

router.post('/tasks/:taskId/unlock', ctrlTasks.unlockTask);

router.get('/tasks/:taskId', ctrlTasks.getTask);

router.get('/tasks', protect, ctrlTasks.getAllTasks);

router.delete('/tasks/:taskId', protect, ctrlTasks.deleteTask);

router.post('/tasks/:taskId/files', locked, ctrlTasks.upload.array('files', 20), ctrlTasks.uploadFiles);

router.get('/tasks/:taskId/files', ctrlTasks.getUploadedFiles);

router.get('/tasks/:taskId/fileNames', ctrlTasks.getUploadedFileNames);

router.post('/tasks/:taskId/log', locked, ctrlTasks.postLogData); // ADD MW

router.get('/tasks/:taskId/log', ctrlTasks.getDataToPlot);

router.post('/tasks/:taskId/status', locked, ctrlTasks.postSetStatus);

router.put('/tasks/:taskId/tag', ctrlTasks.putUpdateTag);

router.post('/tasks/:taskId/reset', locked, ctrlTasks.resetTask);

router.get('/tasks/:taskId/plots', ctrlTasks.getPlots);

router.post('/token', ctrlTasks.refreshToken);

module.exports = router;