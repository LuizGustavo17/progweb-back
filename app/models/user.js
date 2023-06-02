const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Creating a Sharkin's Users Table
 */
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
      },
    password: String,
});

/**
 * explicar
 */
userSchema.pre('save', function (next) {
    if(this.isNew || this.isModified('password')){
        bcrypt.hash(this.password, 10, (err, hashedPassword)=>{
            if(err){
                next(err);
            } else{
                this.password=hashedPassword;
                next();
            }
        })
    }
});

/**
 * Verifying Password
 */
userSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        } else{
            callback(err, same);
        }
    })
}
module.exports = mongoose.model('User', userSchema)