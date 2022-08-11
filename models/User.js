const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    username:{
        type: String,
        required: [true, 'Please provide an username']
    } ,
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minLength: 6
    } ,
    email:{
        type: String,
        unique: true,
        required: [true, 'Please provide an email']
    } ,
    number:{
        type: Number,
        unique: true,
        maxLength: 10,
        minLength: 10,
        required: [true, 'Please provide your phone number']
    } 
});

    UserSchema.plugin(uniqueValidator)

    UserSchema.pre('save', function(next){
        const user = this

        bcrypt.hash(user.password, 10, (error, hash)=>{
            user.password = hash
            next()
        })
    })

const User = mongoose.model('User', UserSchema);
module.exports = User