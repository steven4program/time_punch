/* necessary */
const express = require('express')
const router = express.Router()

/* Controller */
const staffController = require('../controllers/staffController')

/* Staffs */
router.post('/staffs/login', staffController.login)
router.post('/staffs', staffController.register)

module.exports = router
