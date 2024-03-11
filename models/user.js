const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        trim: true,
        minlength: 11,
        maxlength: 11,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    isAdmin:{
        type: Boolean,
        default: false,

    }
},{timestamps: true})

// Generate Auth Token
UserSchema.methods.generateAuthToken = function(){
    return jwt.sign({
        id: this._id,
        name: this.name,
        isAdmin: this.isAdmin,
    },process.env.SECRET_KEY)
}

// User Model
const User = mongoose.model("user", UserSchema)


// Validation Register User
function ValidationRegister(obj) {
    const schema = joi.object({
        name: joi.string().trim().min(2).required(),
        email: joi.string().trim().min(7).required().email(),
        phone: joi.string().trim().min(11).required(),
        password: joi.string().trim().min(6).required(),
    })
    return schema.validate(obj);
}

// Validation Login User
function ValidationLogin(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(7).required().email(),
        password: joi.string().trim().min(6).required(),
    })
    return schema.validate(obj);
}



module.exports ={ User, ValidationRegister, ValidationLogin }