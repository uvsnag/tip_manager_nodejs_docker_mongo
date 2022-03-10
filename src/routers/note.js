const express = require("express");

const router = express.Router();
const Note = require('../model/Note')

router.get('/:id', async (req, res) => {
    try {
        const saveNote = await Note.findById({ _id: req.params.id });
        res.json(saveNote);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const saveNote = await Note.find().limit(100);
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
            saveNote = await Note.updateOne(
                { _id: req.body.id },
                {
                    $set: {
                        name: req.body.name,
                        contents: req.body.contents,
                        idParent: req.body.idParent,
                        updateTime: new Date()
                    }

                }
            );
        } else {
            const note = new Note({
                name: req.body.name,
                contents: req.body.contents,
                idParent: req.body.idParent,
                // deteteTime: req.body.deteteTime,
                updateTime: new Date()
            });
            saveNote = await note.save();
        }
        res.json(saveNote);
    }
    catch (err) {
        res.json({ message: err })
    }
});
router.post('/delete/:id', async (req, res) => {
    try {
        const Note = await Note.remove({ _id: req.params.id });
        res.json(Note);
    }
    catch (err) {
        res.json({ message: err });
    }
});




module.exports = router;