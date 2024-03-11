const path = require('path')
const asyncHandler = require('express-async-handler')
const order  = require('../models/order')

module.exports.getAllOrderCtrl = asyncHandler(async (req, res) => {
    const Orders = await order.find().populate('course').populate('user')
    res.json(Orders)
})


module.exports.addOrderCtrl = asyncHandler(async (req, res) => {
    // Create Order
    const Order = await order.create({
        course: req.body.course,
        user: req.body.user
    })

    res.json({ message: "Order Added Successfully" })

})


module.exports.deleteOrderCtrl = asyncHandler(async (req, res) => {
    await order.findByIdAndDelete(req.params.id)
    res.json({ message: "Order Deleted Successfully !!" })
})


module.exports.updateOrderCtrl = asyncHandler(async (req, res) => {
    await order.findByIdAndUpdate(req.params.id,{isApproved:req.body.isApproved})
    res.json({ message: "Order Updated Successfully !!" })
})