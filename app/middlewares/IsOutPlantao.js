require('dotenv').config();


const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken');
const User=require("../models/user");

/**
 * User going on duty
 * 
 * @param req -> Request
 * @param res -> Response
 */
 const IsOutPlantao = async (req, res, next)=>{
    const token = req.headers['x-access-token'];
    try{
      jwt.verify(token, secret, (err, decoded)=>{
         User.find({email: decoded.email, EmPlantao: false}).exec(function (err, results) {
         var count = results.length;
         if(count==0){
            next();
         } else {
            res.status(401).json({'error': 'Voce nao esta em plantao'});
         }
       });

      });
    } catch(error){
     res.status(500).json({"error":"IsOutPlantao"});
    }
 }
 module.exports = IsOutPlantao;