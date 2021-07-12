const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')


router.post('/register', authController.signup)
router.post('/login', authController.signin)
router.post('/forgot_password', authController.forgotPassword)
router.post('/reset_password', authController.resetPassword)



module.exports = router