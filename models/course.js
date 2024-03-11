const mongoose = require('mongoose')
const joi = require('joi')

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        min: 7,
        required: true,
        trim: true,
    },
    thumbnail:{
        type: Object,
    }
},{ timestamps: true })

const Course = mongoose.model("course", CourseSchema)



function validateCreateCource(obj) {
    const schema = joi.object({
        title: joi.string().min(7).trim().required(),
        url: joi.string().trim().required(),
    })
    return schema.validate(obj)
}


module.exports = {
    Course,
    validateCreateCource
}