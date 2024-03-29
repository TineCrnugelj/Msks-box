const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/auth')

const ctrlFiles = require('../controllers/files');

router.get('/files', protect, ctrlFiles.getAllFiles);

router.post('/files', ctrlFiles.upload.array('files', 10), ctrlFiles.postAddFile);

router.get('/files/download/:fileId', protect, ctrlFiles.downloadFile);

router.delete('/files/deleteAll', ctrlFiles.deleteAll);

router.delete('/files/:fileId', ctrlFiles.deleteFile);

module.exports = router;