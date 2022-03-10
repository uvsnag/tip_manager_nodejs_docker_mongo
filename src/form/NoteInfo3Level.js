const CategoryMaster = require('../model/CategoryMaster')

const NoteInfo3Level ={
    categoryMaster:{
        type: CategoryMaster,
    },
    subCategory:{
        type: String,
    }
};

export {NoteInfo3Level} ;