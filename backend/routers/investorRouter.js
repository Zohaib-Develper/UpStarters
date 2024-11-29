const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const investorController = require("./../controllers/investorController");

router
  .route("/investments")
  .get(authController.Protect, investorController.GetInvestmentdata);

router
  .route("/")
  .get(
    authController.Protect,
    authController.RestrictTo("admin"),
    investorController.AllInvestors
  );

module.exports = router;
