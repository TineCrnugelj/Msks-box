const fs = require('fs');
const multer = require('multer');

const File = require('../models/File');

const fileStorageEngine = multer.diskStorage({
   destination: (req, file, cb) => {
       cb(null, 'public');
   },
    filename: (req, file, cb) => {
       cb(null, file.originalname + '-' + Date.now());
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
    const files = req.files;
    console.log(files);
    for (let file of files) {
        const newFile = File.create({
            metadataPath: file.path,
            size: file.size
        });
    }
    res.status(200).json({msg: 'Files uploaded'});
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