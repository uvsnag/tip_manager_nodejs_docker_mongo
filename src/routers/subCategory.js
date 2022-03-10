const express = require("express");

const router = express.Router();
const SubCategory = require('../model/SubCategory')

router.get('/:id', async (req, res) => {
    try {
        const saveNote = await SubCategory.findById({ _id: req.params.id });
        res.json(saveNote);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const saveNote = await SubCategory.find().limit(100);
        res.json(saveNote);
    }
    catch (err) {
        res.json({ message: err });
    }
});


router.post('/save', async (req, res) => {
    try {
        let saveNote = null;
        if (req.body.id) {
            saveNote = await SubCategory.updateOne(
                { _id: req.body.id },
                {
                    $set: {
                        name: req.body.name,
                        description: req.body.description,
                        idParent: req.body.idParent,
                        updateTime: new Date()
                    }

                }
            );
        } else {
            const subCategory = new SubCategory({
                name: req.body.name,
                description: req.body.description,
                idParent: req.body.idParent,
                deteteTime: null,
                updateTime: new Date()
            });
            saveNote = await subCategory.save();
        }
        res.json(saveNote);
    }
    catch (err) {
        res.json({ message: err })
    }
});
router.post('/delete/:id', async (req, res) => {
    try {

        const currentSubCategory = await SubCategory.findById({ _id: req.params.id });
        let subCategory = null;
        if(!currentSubCategory.deteteTime || currentSubCategory.deteteTime===undefined){
            subCategory = await SubCategory.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        deteteTime: new Date()
                    }

                }
            );
        }else{
            subCategory = await SubCategory.remove({ _id: req.params.id });
        }
        res.json(subCategory);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.post('/restore/:id', async (req, res) => {
    try {

        const subCategory = await SubCategory.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        deteteTime: null
                    }

                }
            );
        res.json(subCategory);
    }
    catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;