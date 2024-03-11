const path = require('path')
const asyncHandler = require('express-async-handler')
const { Eng, validateCreateEng } = require('../models/eng')

module.exports.getAllEngCtrl = asyncHandler(async (req, res) => {
    const enginners = await Eng.find()
    res.json(enginners)
})


module.exports.addEngCtrl = asyncHandler(async (req, res) => {
    // Validation Create Enginner 
    const { error } = validateCreateEng(req.body)
    if (error) {
        res.json({message: error.details[0].message})
    }

    // Create Enginner
    const eng = await Eng.create({
        name: req.body.name,
        job: req.body.job,
        image: req.body.url
    })

    res.json({message: "Enginner Added Successfully"})





})


module.exports.deleteEngCtrl = asyncHandler(async (req, res) => {
    await Eng.findByIdAndDelete(req.params.id)
    res.json({message: "Enginner Deleted Successfully !!"})
})
