var mongoose = require('mongoose');
// create instance of Schema
var Schema = mongoose.Schema;
// create schema
var NoteSchema = new Schema({
    title: {type: String, required:true},
    content: {type: String, required:true},
    category: {type: String, required:true},
    date: { type: Date, default: Date.now },
});
// create model if not exists.
module.exports = mongoose.model('Note', NoteSchema);
