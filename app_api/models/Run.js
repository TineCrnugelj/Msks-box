const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    repository: {type: String, required: true},
    commit: {type: String, required: true},
    entrypoint: {type: String, required: true},
    arguments: [{type: String, required: true}],
    status: {type: String},
    command: {type: String},
    created: {type: Date},
    updated: {type: Date},
    tag: {type: String},
    // properties: {type: String},

    // environment:

});

module.exports = mongoose.model('Run', runSchema, 'Run'); 