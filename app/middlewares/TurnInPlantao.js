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
const TurnInPlantao = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const update = {EmPlantao: true}
    jwt.verify(token, secret, (err, decoded)=>{
    User.findOneAndUpdate({email: decoded.email}, update).catch(err=>{
            res.status(401).json({"TurnInPlantao": "an Internal Error Ocurred"});
        });
    })
    next();
}
module.exports = TurnInPlantao;
