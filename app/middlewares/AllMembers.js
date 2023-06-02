const User=require("../models/user");
const AllMembers = (req, res, next) => {
    try{
        User.find().exec(function (err, results) {
        var count = results.length;
        if(count>=31){
            res.status(401).json({'error':'todos os membros ja estao cadastrados'});
        } else{
            next();
        }
    });
} catch(error){
    res.status(50).json({'error':'AllMembers'});
}
}
module.exports = AllMembers;