const express = require('express')
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const photoUpload = require('../middlewares/photoUpload');
const { addEngCtrl, getAllEngCtrl, deleteEngCtrl } = require('../controllers/engController');


//  Path{ /api/enginners }
router.route("/")
    .post(verifyTokenAndAdmin, addEngCtrl)
    .get(getAllEngCtrl)

//  Path{ /api/eng/:id }
router.route("/:id").delete(verifyTokenAndAdmin, deleteEngCtrl)



module.exports = router