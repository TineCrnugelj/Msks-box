const express = require('express');
const router = express.Router();

const ctrlFiles = require('../controllers/files');

router.get('/files', ctrlFiles.getAllFiles);

router.post('/files/upload', ctrlFiles.upload.single('file'), ctrlFiles.postAddFile);

router.delete('/files/delete/:fileId', ctrlFiles.deleteFile);


module.exports = router;