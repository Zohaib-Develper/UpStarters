const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')
const UserController = require('./../controllers/userController')
const investmentController = require('./../controllers/investmentController')


router.route('/:id').post(authController.Protect, investmentController.InvestInProject)
// router.get('/me', authController.Protect, UserController.GetMe)  Why this here ? Come back here. User's get me 🤪

module.exports = router