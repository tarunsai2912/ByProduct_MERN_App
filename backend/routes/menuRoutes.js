const express = require('express')
const router = express.Router()
const menuController = require('../controller/menuController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, menuController.createMenu)
router.get('/all', menuController.getAllMenuItems)

module.exports = router