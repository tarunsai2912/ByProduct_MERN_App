const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register', userController.userRegister)
router.post('/login', userController.userLogin)
router.get('/get/order', authMiddleware, userController.getAllOrders)

module.exports = router