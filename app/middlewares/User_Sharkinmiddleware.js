const User=require("../models/user");

const User_Sharkinmiddleware = async (req, res, next)=>{
   try{
    await User.find({EmPlantao: true}).exec(function (err, results) {
        var count = results.length;
        if(count>2){
            res.status(401).json({'error': 'Ja ha pessoas demais no plantao'})
        } else {
            next();
        }
      });
   } catch(error){
    res.status(201).json({"error":"User_Sharkinmiddleware"});
   }
}
module.exports = User_Sharkinmiddleware;