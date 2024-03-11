const express = require('express')
const router = express.Router();
const { getAllUsersCtrl, getUserProfileCtrl, UpdateUserProfileCtrl, deleteUserCtrl } = require('../controllers/usersController');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');


//  Path{ /api/users }
router.route("/").get(verifyTokenAndAdmin, getAllUsersCtrl)

//  Path{ /api/users/:id }
router.route("/:id").get(getUserProfileCtrl).delete(verifyTokenAndAdmin, deleteUserCtrl)


module.exports = router