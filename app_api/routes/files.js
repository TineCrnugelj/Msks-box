const express = require('express');
const router = express.Router();

const ctrlFiles = require('../controllers/files');
const ctrlTasks = require('../controllers/runs');

router.get('/files', ctrlFiles.getAllFiles);

router.post('/files/upload', ctrlFiles.upload.array('file', 2), ctrlFiles.postAddFile);

router.delete('/files/delete/:fileId', ctrlFiles.deleteFile);


module.exports = router;