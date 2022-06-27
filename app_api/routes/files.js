const express = require('express');
const router = express.Router();

const ctrlFiles = require('../controllers/files');

const {protect} = require('../middleware/auth');

router.get('/files', ctrlFiles.getAllFiles);

router.post('/files', protect, ctrlFiles.upload.single('file'), ctrlFiles.postAddFile);

router.delete('/files/delete/:fileId', ctrlFiles.deleteFile);

module.exports = router;