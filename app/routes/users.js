var express = require('express');
var router = express.Router();
const User = require('../models/user');
const AllMembers = require('../middlewares/AllMembers');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

// Checando se o email é da focus


// Resgistering a new user
router.post('/register', async(req, res) =>{
  const {email, password} = req.body;
  const user = new User({email, password});
  try{
    await user.save();
    res.status(200).json(user);
  } catch (error){
    res.status(500).json({error})
  }

})

// Logging
router.post('/login', async(req, res)=>{
  const {email, password} = req.body;
  try{
    let user = await User.findOne({ email });
    if(!user){
      res.status(401).json({error:'Incorrect email or password'});
    } else{
      user.isCorrectPassword(password, function(err, same){
        if(!same){
          res.status(401).json({error:'Incorrect email or password'});
        } else{
          const token = jwt.sign({email}, secret, {expiresIn:'1d'});
          res.status(200).json({user: user, token:token})
        }
      })
    }
  }
  catch(error){
    res.status(500).json({error: 'Internal error, try again later'})
  }
})

/*router.put('changepassword', async(req, res)=>{
  let {password, newpassword, newpassword2, matricula}=req.body;
  let user = await User.findOne({matricula: matricula });
  
    user.isCorrectPassword(password, function(err, same){
      if(!same){
        res.status(401).json({error:'Incorrect password'});
      }
     });
      if(newpassword===newpassword2){
          user.findOneAndUpdate({matricula: matricula }, {$set:{password: newpassword}});
        }
      })*/


module.exports = router;
