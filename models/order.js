const mongoose = require('mongoose')
const joi = require('joi')

const OrderSchema = new mongoose.Schema({
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    isApproved:{
        type: Boolean,
        default: false
    }
},{ timestamps: true })

const order = mongoose.model("order", OrderSchema)



module.exports = order