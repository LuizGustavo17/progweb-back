const Sharkin = require('../models/sharkin');
const User = require('../models/user');
    async function MakeAllInvalid() {
        try{
            await Sharkin.updateMany({IsValid:true}, {IsValid:false});
            console.log('succeful');
        } catch (error) {
            console.log(error);
        }
    }


module.exports = MakeAllInvalid;