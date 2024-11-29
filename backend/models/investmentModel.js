const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  equityAcquired: {
    type: Number,
    // required: true
  },
  investmentDate: {
    type: Date,
    default: Date.now,
  },
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
