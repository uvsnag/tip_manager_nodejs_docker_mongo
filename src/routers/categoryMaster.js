const express = require("express");

const router = express.Router();
const CategoryMaster = require('../model/CategoryMaster')

router.get('/:id', async (req, res) => {
    try {
        const saveCategoryMaster = await CategoryMaster.findById({ _id: req.params.id });
        res.json(saveCategoryMaster);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const saveCategoryMaster = await CategoryMaster.find().limit(100);
        res.json(saveCategoryMaster);
    }
    catch (err) {
        res.json({ message: err });
    }
});


router.post('/save', async (req, res) => {
    try {
        let saveCategoryMaster = null;
        if (req.body.id) {
            saveCategoryMaster = await CategoryMaster.updateOne(
                { _id: req.body.id },
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        updateTime: new Date()
                    }

                }
            );
        } else {
            const categoryMaster = new CategoryMaster({
                name: req.body.name,
                description: req.body.description,
                deteteTime: null,
                updateTime: new Date()
            });
            saveCategoryMaster = await categoryMaster.save();
        }
        res.json(saveCategoryMaster);
    }
    catch (err) {
        res.json({ message: err })
    }
});
router.post('/delete/:id', async (req, res) => {
    try {

        const currentCategoryMaster = await CategoryMaster.findById({ _id: req.params.id });
        let categoryMaster = null;
     
        if (!currentCategoryMaster.deteteTime || currentCategoryMaster.deteteTime === undefined) {
            categoryMaster = await CategoryMaster.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        deteteTime: new Date()
                    }

                }
            );
        } else {
            categoryMaster = await CategoryMaster.remove({ _id: req.params.id });
        }
        res.json(categoryMaster);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.post('/restore/:id', async (req, res) => {
    try {

        const categoryMaster = await CategoryMaster.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        deteteTime: null
                    }

                }
            );
        res.json(categoryMaster);
    }
    catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;