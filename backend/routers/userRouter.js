const AuthController = require("./../controllers/authController");
const UserController = require("./../controllers/userController");
const express = require("express");

const router = express.Router();

//Investment Related Routes
router
  .route("/investments")
  .get(AuthController.Protect, UserController.getInvestmentsData);

router
  .route("/")
  .get(AuthController.Protect, UserController.getUser)
  .patch(AuthController.Protect, UserController.updateUser)
  .delete(AuthController.Protect, UserController.deleteUser);

router.route("/signup").post(AuthController.SignUp);
router.route("/verify-otp").post(AuthController.VerifyOTP);
router.route("/login").post(AuthController.LogIn);
router
  .route("/updatepassword")
  .patch(AuthController.Protect, AuthController.UpdatePassword);
router.route("/logout").get(AuthController.Protect, AuthController.LogOut);
router.route("/:id").get(UserController.getUserById);

module.exports = router;
