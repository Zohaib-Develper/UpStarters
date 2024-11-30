const User = require("./../models/userModel");
const catchAync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Investments = require("../models/investmentModel");

//User Related Operations
exports.getUserById = catchAync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("User does not exists!", 400));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.getUser = catchAync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("User not found!", 400));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateUser = catchAync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "Update your password through /api/auth/updatepassword route",
        400
      )
    );
  }

  console.log("Updating");
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    user: user,
  });
});

exports.deleteUser = catchAync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(200).json({
    status: "success",
    message: "user deleted!",
  });
});

//Investment Related Operations
exports.getInvestmentsData = catchAync(async (req, res, next) => {
  console.log("GetInvestmentdata Request Recieved");
  const investments = await Investments.find({
    investor: req.user._id,
  }).populate("project");
  console.log("Sending Data to user");
  res.status(200).json({
    status: "Success",
    data: {
      investments,
    },
  });
});
