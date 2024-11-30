const AuthController = require("./../controllers/authController");
const UserController = require("./../controllers/userController");
const express = require("express");

const router = express.Router();

//Investment Related Routes
router
  .route("/users/investments")
  .get(AuthController.Protect, UserController.GetInvestmentdata);

router
  .route("/users")
  .get(AuthController.Protect, UserController.GetMe)
  .patch(AuthController.Protect, UserController.UpdateMe)
  .delete(AuthController.Protect, UserController.DeleteMe);

router.route("/users/signup").post(AuthController.SignUp);
router.route("/users/verify-otp").post(AuthController.VerifyOTP);
router.route("/login").post(AuthController.LogIn);
router
  .route("/users/updatepassword")
  .patch(AuthController.Protect, AuthController.UpdatePassword);
router
  .route("/users/logout")
  .get(AuthController.Protect, AuthController.LogOut);
router.route("/users/:id").get(UserController.GetUserById);

router
  .route("/admin/investors")
  .get(
    AuthController.Protect,
    AuthController.RestrictTo("admin"),
    UserController.AllInvestors
  );

module.exports = router;

module.exports = router;
