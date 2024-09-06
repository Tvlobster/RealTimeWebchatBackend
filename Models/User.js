const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})

userSchema.set('toObject',{virtuals:true})
userSchema.set('toJSON',{virtuals:true})

const User = mongoose.model('User', userSchema, 'Users')
module.exports = User