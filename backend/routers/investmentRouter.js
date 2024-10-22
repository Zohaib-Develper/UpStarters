const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')
const UserController = require('./../controllers/userController')
const investmentController = require('./../controllers/investmentController')


router.route('/:id').post(authController.Protect, authController.RestrictTo('investor'), investmentController.InvestInProject)
router.get('/me', authController.Protect, UserController.GetMe)

module.exports = router