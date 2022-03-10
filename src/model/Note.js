const mongoose = require('mongoose');


const NoteSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    contents:{
        type: String,
        require: true
    },
    idParent:{
        type: String,
        require: true
    },
    deteteTime:{
        type: Date,
    },
    updateTime:{
        type: Date,
    }
});

module.exports = mongoose.model('Note', NoteSchema)