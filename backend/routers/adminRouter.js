const adminController = require("./../controllers/adminController");
const authController = require("./../controllers/authController");
const express = require("express");

const router = express.Router();

router.route("/login").post(authController.AdminLogin);
router
  .route("/logout")
  .post(authController.restrictToAdmin, authController.AdminLogout);
router
  .route("/investors")
  .get(authController.restrictToAdmin, adminController.allInvestors);

router
  .route("/stats")
  .get(authController.restrictToAdmin, adminController.stats);

router
  .route("/users")
  .get(authController.restrictToAdmin, adminController.getAllUsers);
router
  .route("/projects")
  .get(authController.restrictToAdmin, adminController.getAllProjects);

router
  .route("/users/:id")
  .delete(authController.restrictToAdmin, adminController.deleteUser);
router
  .route("/projects/:id")
  .delete(authController.restrictToAdmin, adminController.deleteProject);

module.exports = router;
