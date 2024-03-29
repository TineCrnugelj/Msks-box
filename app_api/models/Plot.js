const mongoose = require("mongoose");
const plotSchema = new mongoose.Schema({
    task: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Task'},
    name: {type: String},
    data: [{type: Number}],
});

module.exports = mongoose.model( 'Plot', plotSchema, 'Plot');