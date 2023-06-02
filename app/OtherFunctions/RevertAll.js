const Sharkin = require('../models/sharkin');
const User = require('../models/user');
    async function RevertAll() {
        try{
            await User.updateMany({EmPlantao:true}, {EmPlantao:false});
            console.log('succeful');
        } catch (error) {
            console.log(error);
        }

        try{
            await Sharkin.deleteMany({IsComplete:false});
            console.log('succeful');
        } catch (error) {
            console.log(error);
        }
    }


module.exports = RevertAll;