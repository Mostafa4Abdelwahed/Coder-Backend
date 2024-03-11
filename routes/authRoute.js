const express = require('express')
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {registerUserCtrl, loginUserCtrl, addNewUserCtrl} = require('./../controllers/authController')

//  Path{ /api/auth/register }
router.post("/register", registerUserCtrl)
//  Path{ /api/auth/newuser }
// router.post(verifyTokenAndAdmin, "/newuser", addNewUserCtrl)
router.route("/newuser").post(verifyTokenAndAdmin, addNewUserCtrl)


//  Path{ /api/auth/login }
router.post("/login", loginUserCtrl)


module.exports = router