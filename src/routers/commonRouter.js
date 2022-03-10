const express = require("express");

const router = express.Router();
const CategoryMaster = require('../model/CategoryMaster')



// app.get('/all-tips', async (req, res) => {

//     try {
//         const dataDeleted = req.query.dataDeleted;
//         console.log("dataDeleted:" + dataDeleted);


//         const categoryMaster =  (dataDeleted==="true")  ? await CategoryMaster.find().sort( {  "_id": 1 } )
//         :await CategoryMaster.find({deteteTime : null }).find().sort( {  "_id": 1 } );
//         console.log("categoryMaster:" + categoryMaster);
//         let noteInfo3Levels = new Array();
//         let noteInfoSubCates = new Array();
//         if (categoryMaster) {
//             let proGetData = new Promise(function (resolve, reject) {

//                 categoryMaster.forEach(async (itemMas) => {
//                     let flagSub=false;
//                     const subCategory = (dataDeleted==="true")  ? await SubCategory.find({ idParent: itemMas._id }).find().sort( {  "_id": 1 } )
//                     :await SubCategory.find({ idParent: itemMas._id, deteteTime : null }).find().sort( {  "_id": 1 } );
//                     console.log("subCategory:" + subCategory);

//                     if (subCategory) {


//                         let proGetData = new Promise(function (resolve, reject) {
//                             subCategory.forEach(async (itemSub) => {
//                                const note = (dataDeleted==="true") ? await Note.find({ idParent: itemSub._id}).find().sort( {  "_id": 1 } )
//                                 :await Note.find({ idParent: itemSub._id, deteteTime : null}).find().sort( {  "_id": 1 } );
//                                 console.log("note:" + note);
//                                 noteInfoSubCates.push({
//                                     _id:itemSub._id,
//                                     name:itemSub.name,
//                                     description:itemSub.description,
//                                     idParent:itemSub.idParent,
//                                     updateTime:itemSub.updateTime,
//                                     note: note
//                                 })
//                                 if (noteInfoSubCates.length == subCategory.length) {
//                                     resolve();
//                                     flagSub = true
//                                 }
//                             });
//                         });

//                         proGetData.then(() => {
//                             console.log("noteInfo3Levels");
//                         });

//                     }
//                      await new Promise(resolve => setTimeout(resolve, 500));
//                     noteInfo3Levels.push({
//                         categoryMaster: itemMas,
//                         subCategory: noteInfoSubCates
//                     });

//                     noteInfoSubCates = new Array();

//                     console.log("noteInfo3Levels.length:" + noteInfo3Levels.length + "-categoryMaster.length :" + categoryMaster.length);
//                     if (noteInfo3Levels.length == categoryMaster.length) {
//                         console.log("resolve -time :" + new Date().getTime());
//                         resolve(noteInfo3Levels);

//                     }
//                 });
//             });
//             proGetData.then(result => {
//                 console.log("res:" + result + "-time :" + new Date().getTime());
//                 res.json(result);
//             })
//         }
//     }
//     catch (err) {
//         res.json({ message: err });
//     }
// });