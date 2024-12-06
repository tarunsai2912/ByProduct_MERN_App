const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/place/:menuItemId', authMiddleware, orderController.placeOrder)

module.exports = router