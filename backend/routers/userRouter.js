const AuthController = require('./../controllers/authController')
const UserController = require('./../controllers/userController')
const express = require('express')

const router = express.Router();

router.route('/').get(AuthController.Protect, UserController.GetMe).patch(AuthController.Protect, UserController.UpdateMe).delete(AuthController.Protect, UserController.DeleteMe)

router.route('/signup').post(AuthController.SignUp)
router.route('/verify-otp').post(AuthController.VerifyOTP)
router.route('/login').post(AuthController.LogIn)
router.route('/updatepassword').patch(AuthController.Protect, AuthController.UpdatePassword)
router.route('/logout').get(AuthController.Protect, AuthController.LogOut)
router.route('/:id').get(UserController.GetUserById)


module.exports = router