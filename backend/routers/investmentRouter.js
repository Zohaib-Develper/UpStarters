const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const UserController = require("./../controllers/userController");
const investmentController = require("./../controllers/investmentController");

router.route("/:id").post(authController.Protect, investmentController.invest);

module.exports = router;
