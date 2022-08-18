const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    task: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Run'},
    metadataPath: {type: String},
    outputPath: {type: String},
    outputFiles: [{type: String}],
    size: {type: Number},
    fileData: {
        type: Map,
        of: Array
    }
});

module.exports = mongoose.model('File', fileSchema, 'File');