const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    maxlength: [40, "Summary length must be less than 40"],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: [
      "Technology",
      "Art",
      "Design",
      "Music",
      "Film",
      "Food",
      "Gaming",
      "Photography",
      "Fashion",
      "Health",
      "Sports",
      "Comics",
      "Education",
    ],
    required: [true, "Please enter project category."],
  },
  image: {
    type: String,
    required: [true, "Please Enter Project image"],
  },
  investmentGoal: {
    type: Number,
    required: true,
  },
  fundsRaised: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "active"],
    // required: true
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "3d",
  },
  //   startsFrom: {
  //     type: Date,
  //     required: true,
  //   },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  investors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], // List of investors who invested
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
