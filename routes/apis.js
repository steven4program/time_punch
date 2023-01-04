/* Necessary Package */
const express = require('express')
const router = express.Router()

/* Controller */
const staffController = require('../controllers/staffController')
const punchController = require('../controllers/punchController')

/* Auth */
const authenticated = require('../middleware/auth')

/* Staffs */
router.post('/staffs/login', staffController.login)
router.post('/staffs', staffController.register)
router.get('/staffs/:id', authenticated, staffController.getStaff)
router.post('/punchin', authenticated, punchController.punch)

module.exports = router
