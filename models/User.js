const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    } ,
    password:{
        type: String,
        required: true,
        minLength: 6
    } ,
    email:{
        type: String,
        unique: true,
        required: true
    } ,
    number:{
        type: Number,
        unique: true,
        maxLength: 10,
        minLength: 10,
        required: true
    } 
});
    UserSchema.pre('save', function(next){
        const user = this

        bcrypt.hash(user.password, 10, (error, hash)=>{
            user.password = hash
            next()
        })
    })

const User = mongoose.model('User', UserSchema);
module.exports = User