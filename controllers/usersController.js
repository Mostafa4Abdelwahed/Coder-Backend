const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { User, ValidationUpdateUser } = require('./../models/user')

module.exports.getAllUsersCtrl = asyncHandler(async (req, res) =>{
    const users = await User.find().select("-password");
    if (users.length === 0) {
        res.json({message:"No Data"})
    }
    res.json(users)
})

module.exports.getUserProfileCtrl = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
        res.json({message:"User Not Found"})
    }
    res.json(user)
})

module.exports.deleteUserCtrl = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.params.id)
    if (!user) {
        res.json({message:"User Not Found"})
    }
    await User.findByIdAndDelete(req.params.id)
    res.json({message: "This User Deleted"})
})

