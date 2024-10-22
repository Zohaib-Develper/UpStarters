const AuthController = require('./../controllers/authController')
const UserController = require('./../controllers/userController')
const express = require('express')

const router = express.Router();

router.route('/').get(AuthController.Protect, UserController.GetMe).patch(AuthController.Protect, UserController.UpdateMe)

router.route('/signup').post(AuthController.SignUp)
router.route('/login').post( AuthController.LogIn)
router.route('/:id').get(UserController.GetUserById)
router.route('/updatepassword').patch(AuthController.Protect, AuthController.UpdatePassword)
// AuthController.Protect, AuthController.RestrictTo('investor')

module.exports = router