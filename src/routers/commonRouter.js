const express = require("express");

const router = express.Router();
const CategoryMaster = require('../model/CategoryMaster')



router.get('/', async (req, res) => {
    try {
        const saveCategoryMaster = await CategoryMaster.find()
        res.json(saveCategoryMaster);
    }
    catch (err) {
        res.json({ message: err });
    }
});
