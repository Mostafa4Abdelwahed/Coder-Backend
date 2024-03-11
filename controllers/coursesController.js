const path = require('path')
const asyncHandler = require('express-async-handler')
const { Course, validateCreateCource } = require('../models/course')

module.exports.getAllCoursesCtrl = asyncHandler(async (req, res) => {
    const courses = await Course.find()
    res.json(courses)
})


module.exports.addCourseCtrl = asyncHandler(async (req, res) => {
    // Validation Create Course 
    const { error } = validateCreateCource(req.body)
    if (error) {
        res.json({message: error.details[0].message})
    }

    // Create Course
    const course = await Course.create({
        title: req.body.title,
        thumbnail: req.body.url
    })

    res.json({message: "Course Added Successfully"})

})


module.exports.deleteCourseCtrl = asyncHandler(async (req, res) => {
    await Course.findByIdAndDelete(req.params.id)
    res.json({message: "Course Deleted Successfully !!"})
})
