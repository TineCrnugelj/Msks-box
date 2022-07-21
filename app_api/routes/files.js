const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/auth')

const ctrlFiles = require('../controllers/files');

router.get('/files', protect, ctrlFiles.getAllFiles);

router.post('/files', protect, ctrlFiles.upload.single('file'), ctrlFiles.postAddFile);

router.get('/files/download/:fileId', ctrlFiles.downloadFile);

router.delete('/files/:fileId', ctrlFiles.deleteFile);

module.exports = router;