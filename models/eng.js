const mongoose = require('mongoose')
const joi = require('joi')

const EngSchema = new mongoose.Schema({
    name:{
        type: String,
        min: 4,
        required: true,
        trim: true,
    },
    job:{
        type: String,
        min: 4,
        required: true,
        trim: true,
    },
    image:{
        type: Object,
        required: true,
        trim: true
    }
},{ timestamps: true })

const Eng = mongoose.model("engineer", EngSchema)



function validateCreateEng(obj) {
    const schema = joi.object({
        name: joi.string().min(4).trim().required(),
        job: joi.string().trim().required(),
        url: joi.string().trim().required(),
    })
    return schema.validate(obj)
}


module.exports = {
    Eng,
    validateCreateEng
}