const mongoose = require('mongoose');


const SubCategorySchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
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

module.exports = mongoose.model('SubCategory', SubCategorySchema)