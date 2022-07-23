const fs = require('fs');
const multer = require('multer');
const download = require('download');
const path = require('path');

const File = require('../models/File');

const fileStorageEngine = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, 'public');
   },
    filename: (req, file, cb) => {
       cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: fileStorageEngine});

const getAllFiles = (req, res) => {
    File.find().exec().then(files => {
        if (!files) {
            return res.status(404).json({message: 'Files not found!'});
        }
        return res.status(200).json(files);
    });
};

const postAddFile = (req, res) => {
    const metadataFilePath = req.file.path;

    const newFile = new File({
        metadataPath: metadataFilePath,
        size: req.file.size
    });

    newFile.save((err, file) => {
        if (err) {
            res.status(400).json(err);
        }
        else {
            if (!file) {
                res.status(404).json({message: 'File has not been created.'});
            }
            else {
                return res.status(200).json(file);
            }
        }
    })
};

const downloadFile = async (req, res) => {
    const fileId = req.params.fileId;
    const file = await File.findById(fileId);

    const filePath = file.metadataPath;
    res.download(filePath);
    console.log(res);
}

const deleteFile = (req, res) => {
    const fileId = req.params.fileId;
    if (fileId) {
        File.findById(fileId).then(file => {
           fs.unlink(file.metadataPath, (err) => {});
           // TODO delete outputFiles
        });
        File.findByIdAndRemove(fileId).exec(error => {
            if (error) {
                return res.status(500).json(error);
            }

            res.status(200).json({id: fileId});
        });
    }
    else {
        res.status(404).json({message: 'Parameter fileId missing'});
    }
};

module.exports = {
    getAllFiles,
    postAddFile,
    deleteFile,
    upload,
    downloadFile,
}