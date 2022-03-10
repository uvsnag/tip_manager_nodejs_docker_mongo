const express = require("express");
const app = express();
const ConnectDB = require("./config/db");
const bodyParser = require('body-parser');
key = require('./config/main');
connectDB = require('./config/db');
const CategoryMaster = require('./model/CategoryMaster')
const SubCategory = require('./model/SubCategory')
const Node = require('./model/Note')



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

    try {
        const categoryMaster = await CategoryMaster.find();
        console.log("categoryMaster:" + categoryMaster);
        let noteInfo3Levels = new Array();
        let noteInfoSubCates = new Array();
        if (categoryMaster) {
            let proGetData = new Promise(function (resolve, reject) {

                categoryMaster.forEach(async (itemMas) => {
                    let flagSub=false;
                    const subCategory = await SubCategory.find({ idParent: itemMas._id });
                    console.log("subCategory:" + subCategory);

                    if (subCategory) {


                        let proGetData = new Promise(function (resolve, reject) {
                            subCategory.forEach(async (itemSub) => {
                                note = await Node.find({ idParent: itemSub._id });
                                console.log("note:" + note);
                                noteInfoSubCates.push({
                                    // subCategory: itemSub,
                                    _id:itemSub._id,
                                    name:itemSub.name,
                                    description:itemSub.description,
                                    idParent:itemSub.idParent,
                                    updateTime:itemSub.updateTime,
                                    note: note
                                })
                                if (noteInfoSubCates.length == subCategory.length) {
                                    resolve();
                                    flagSub =true
                                }
                            });
                        });

                        proGetData.then(() => {
                            console.log("noteInfo3Levels");
                        });

                    }
                     await new Promise(resolve => setTimeout(resolve, 500));
                    noteInfo3Levels.push({
                        categoryMaster: itemMas,
                        subCategory: noteInfoSubCates
                    });

                    noteInfoSubCates = new Array();

                    console.log("noteInfo3Levels.length:" + noteInfo3Levels.length + "-categoryMaster.length :" + categoryMaster.length);
                    if (noteInfo3Levels.length == categoryMaster.length) {
                        console.log("resolve -time :" + new Date().getTime());
                        resolve(noteInfo3Levels);

                    }
                });
            });
            proGetData.then(result => {
                console.log("res:" + result + "-time :" + new Date().getTime());
                res.json(result);
            })
        }
    }
    catch (err) {
        res.json({ message: err });
    }
});
// async function getNote(subCategory, noteInfoSubCates) {
//     if (!subCategory) {
//         return null;
//     }
//     // let noteInfoSubCates = new Array();
//     let note = null;
//     let proGetData = new Promise(function (resolve, reject) {
//         subCategory.forEach(async (itemSub) => {
//             note = await Node.find({ idParent: itemSub._id });
//             console.log("note:" + note);
//             noteInfoSubCates.push({
//                 subCategory: itemSub,
//                 note: note
//             })
//             if (noteInfoSubCates.length == subCategory.length) {
//                 resolve(noteInfoSubCates);
//             }
//         });
//     });
//     proGetData.then(result => {
//         console.log("getNote result:" + result);
//         console.log("getNote -time :" + new Date().getTime());
//         noteInfoSubCates = result;
//     })
// }

app.listen(port, () => console.log('Server is running....'))