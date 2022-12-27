/* Necessary Package */
const express = require('express')
const router = express.Router()

/* Controller */
const staffController = require('../controllers/staffController')

/* Auth */
const authenticated = require('../middleware/auth')

/* Staffs */
router.post('/staffs/login', staffController.login)
router.post('/staffs', staffController.register)
router.get('/staffs/:id', authenticated, staffController.getStaff)

module.exports = router
