const express = require('express')
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const { addOrderCtrl, getAllOrderCtrl, deleteOrderCtrl, updateOrderCtrl } = require('../controllers/ordersController');


//  Path{ /api/orders }
router.route("/")
    .post(addOrderCtrl)
    .get(verifyTokenAndAdmin, getAllOrderCtrl)

//  Path{ /api/orders/:id }
router.route("/:id").delete(verifyTokenAndAdmin, deleteOrderCtrl).put(verifyTokenAndAdmin, updateOrderCtrl)



module.exports = router