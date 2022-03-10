const mongoose = require('mongoose');


const CategoryMasterSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
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

module.exports = mongoose.model('CategoryMaster', CategoryMasterSchema)