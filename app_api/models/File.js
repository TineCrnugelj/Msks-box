const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    metadataPath: {type: String},
    outputPath: {type: String},
    outputFiles: [{type: String}],
});

module.exports = mongoose.model('File', fileSchema, 'File');