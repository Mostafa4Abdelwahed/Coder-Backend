const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { User, ValidationRegister, ValidationLogin } = require('../models/user')

module.exports.registerUserCtrl = asyncHandler( async (req, res)=>{

    const {name, email, phone, password} = req.body

    // validation
    const { error } = ValidationRegister(req.body);
    if (error) {
        return res.json({message: error.details[0].message})
    }

    // // check user exist
    let email_exist = await User.findOne({email})
    let phone_exist = await User.findOne({phone})
    if (email_exist || phone_exist) {
        return res.json({message: "This Email or Phone Already Exist"})
    }

    // hash to password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    // new user and save to db
    let user = new User({name, email, phone, password:hashPassword});
    await user.save();
    res.json({message: "تم إنشاء الحساب, برجاء تسجيل الدخول"})
})

module.exports.addNewUserCtrl = asyncHandler( async (req, res)=>{

    const {name, email, phone, password, isAdmin} = req.body

    // // check user exist
    let email_exist = await User.findOne({email})
    let phone_exist = await User.findOne({phone})
    if (email_exist || phone_exist) {
        return res.status(404).json({message: "This Email or Phone Already Exist"})
    }

    // hash to password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    // new user and save to db
    let user = new User({name, email, phone, password:hashPassword, isAdmin:isAdmin});
    await user.save();
    res.json({message: "تم إنشاء الحساب, برجاء تسجيل الدخول"})
})

module.exports.loginUserCtrl = asyncHandler( async (req, res) =>{
    const {email, password} = req.body

    // Validation
    const { error } = ValidationLogin(req.body);
    if (error) {
        return res.status(404).json({message: error.details[0].message})
    }

    // Check User Exist
    const user = await User.findOne({email})
    if (!user) {
        res.status(404).json({message:"الإيميل او الباسورد خطأ"})
    }

    // Check Password
    const isPasswordMatch = bcrypt.compareSync(password,user.password)
    if (!isPasswordMatch) {
        res.status(404).json({message:"الإيميل او الباسورد خطأ"})
    }

    // Generate Toke (JWT)
    const token = user.generateAuthToken();
    res.json({
        _id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        token,
    })
    // Response Client
})