/* Necessary Package */
const express = require('express')
const router = express.Router()

/* Controller */
const staffController = require('../controllers/staffController')
const punchController = require('../controllers/punchController')

/* Auth */
const authenticated = require('../middleware/auth')

/* Staffs */
router.get('/get_current_staff', authenticated, staffController.getCurrentStaff)
router.post('/staffs/login', staffController.login)
router.post('/staffs', staffController.register)
router.get('/staffs/:id', authenticated, staffController.getStaff)
router.post('/punch', authenticated, punchController.punch)
router.get('/', authenticated)

module.exports = router
