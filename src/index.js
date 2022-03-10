const express = require("express");
const app = express();
const ConnectDB = require("./config/db");
const bodyParser = require('body-parser');
key = require('./config/main');
connectDB = require('./config/db');
const CategoryMaster = require('./model/CategoryMaster')
const SubCategory = require('./model/SubCategory')
const Note = require('./model/Note')



const { port, mongoURL } = key;
const cors = require('cors')
app.use(cors());
app.use(bodyParser.json());

ConnectDB(mongoURL);

//Import routers
const categoryMasterRouter = require('./routers/categoryMaster')
const noteRouter = require('./routers/note')
const subCategory = require('./routers/subCategory')

app.use('/categorymasters', categoryMasterRouter);
app.use('/notes', noteRouter);
app.use('/subcategories', subCategory);

app.get('/all-tips', async (req, res) => {
    const dataDeleted = req.query.dataDeleted;
    console.log("dataDeleted:" + dataDeleted);
    let noteInfo3Levels = new Array();
    await getAllData(dataDeleted, noteInfo3Levels)

    res.json(noteInfo3Levels)
});

async function getAllData(dataDeleted, noteInfo3Levels) {
    
    let noteInfoSubCates = new Array();


    const categoryMaster = (dataDeleted === "true") ? await CategoryMaster.find().sort({ "_id": 1 })
        : await CategoryMaster.find({ deteteTime: null }).find().sort({ "_id": 1 });

    if (categoryMaster) {
        console.log("categoryMaster:" + categoryMaster);

        for (const itemMas of categoryMaster) {
            const subCategory = (dataDeleted === "true") ? await SubCategory.find({ idParent: itemMas._id }).find().sort({ "_id": 1 })
                : await SubCategory.find({ idParent: itemMas._id, deteteTime: null }).find().sort({ "_id": 1 });

            if (subCategory) {

                console.log("subCategory:" + subCategory);

                await getSubCategoryData(dataDeleted, subCategory, noteInfoSubCates);

            }
            noteInfo3Levels.push({
                categoryMaster: itemMas,
                subCategory: noteInfoSubCates
            });
            console.log("oGetData.then noteInfo3Levels");
            noteInfo3Levels.forEach((it) => {
                console.log("it:" + it);
            });

            noteInfoSubCates = new Array();
        }

    }

}

async function getSubCategoryData(dataDeleted, subCategory, noteInfoSubCates) {

    for (const itemSub of subCategory) {
        const note = (dataDeleted === "true") ? await Note.find({ idParent: itemSub._id }).find().sort({ "_id": 1 })
            : await Note.find({ idParent: itemSub._id, deteteTime: null }).find().sort({ "_id": 1 });

        console.log("note:" + note);

        noteInfoSubCates.push({
            _id: itemSub._id,
            name: itemSub.name,
            description: itemSub.description,
            idParent: itemSub.idParent,
            updateTime: itemSub.updateTime,
            note: note
        })
    }

}


app.get('/search', async (req, res) => {
    try {
        const searchStr = req.query.strSearch;
        console.log("searchStr:" + searchStr);
        console.log("'/'+searchStr+'/':" + '/' + searchStr + '/');
        const currentNote = await Note.find({ contents: '/' + searchStr + '/' });
        res.json(currentNote);
    }
    catch (err) {
        res.json({ message: err });
    }
});

app.listen(port, () => console.log('Server is running....'))