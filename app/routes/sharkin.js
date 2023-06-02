var express = require('express');
var router = express.Router();
const Sharkin = require('../models/sharkin');
const WithAuth = require('../middlewares/auth');
const TurnInPlantao = require('../middlewares/TurnInPlantao');
const TurnOffPlantao = require('../middlewares/TurnOffPlantao');
const User_Sharkinmiddleware = require('../middlewares/User_sharkinmiddleware');
const IsInPlantao = require('../middlewares/IsInPlantao');
const IsOutPlantao = require('../middlewares/IsOutPlantao');

// Sharkin's Checkin
router.post('/sharkin', WithAuth/*, User_Sharkinmiddleware*/, IsInPlantao, TurnInPlantao, async(req, res) =>{
    const date = new Date();
let fix =date.setHours(date.getHours());
    try{
        let sharkin = new Sharkin({User_Id:req.user._id, IsComplete:false, IsValid: false, HourSharkin:fix});
        await sharkin.save();
        res.status(200).json(sharkin);
    }
    catch (error) {
        res.status(500).json({error: 'An internal error ocurred'});
    }
})

// Sharkin's Checkout
router.put('/sharkout', WithAuth, IsOutPlantao,  TurnOffPlantao, async(req, res) =>{
    const date = new Date();
let fix =date.setHours(date.getHours());
    try{
        let docs = await Sharkin.findOneAndUpdate({User_Id:req.user._id, IsComplete:false}, {$set:{IsComplete:true, HourSharkout: fix, IsValid: true}}, {returnOriginal:false});
        res.status(200).json(docs);
    }
    catch (error) {
        res.status(500).json({error: 'An internal error ocurred'});
    }
});


router.get('/list', WithAuth, async(req, res) =>{
    try{
        let docs = await Sharkin.find({IsComplete: true, IsValid:true}).populate('User_Id');
        res.status(200).json(docs);
    }
    catch (error) {
        res.status(500).json({error: 'An internal error ocurred'});
    }
});


module.exports = router;