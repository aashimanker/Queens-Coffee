const express = require('express')

const router = express.Router()

const orderController = require('../controllers/orders-controller')

router.route("/orderBill").post(orderController.calculateBill)

module.exports = router