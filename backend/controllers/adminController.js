const Investment = require("../models/investmentModel");
const Project = require("../models/projectModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.allInvestors = catchAsync(async (req, res, next) => {
  const investors = await Investments.find()
    .populate("investor", "name email")
    .populate("project", "title description")
    .select("amount equityAcquired investmentDate");

  if (!investors || investors.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No investors found",
    });
  }

  res.status(200).json({
    status: "success",
    results: investors.length,
    data: {
      investors,
    },
  });
});

exports.stats = catchAsync(async (req, res) => {
  const users = await User.find();
  const projects = await Project.find();
  res
    .status(200)
    .send({ noOfProjects: projects.length, noOfUsers: users.length });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  let users = await User.find();

  for (let i = 0; i < users.length; i++) {
    const projects = await Project.find({ creator: users[i]._id });
    const investments = await Investment.find({ investor: users[i]._id });

    users[i] = users[i].toObject(); // Convert to plain object
    users[i].noOfProjects = projects.length;
    users[i].noOfInvestments = investments.length;
  }

  res.status(200).send({ users });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "user deleted!",
  });
});

exports.getAllProjects = catchAsync(async (req, res) => {
  const projects = await Project.find().populate("creator");
  console.log(projects);
  res.status(200).send({ projects });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Project deleted!",
  });
});
