const Investment = require("./../models/investmentModel");
const Project = require("./../models/projectModel");
const AppError = require("./../utils/appError");
const catchAync = require("./../utils/catchAsync");
const handlePayment = require("./paymentController");

exports.invest = catchAync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) return next(new AppError("No Project found!", 404));
  console.log("inside invest", Object.keys(req.body), "Val: ", req.body);
  // if (project.status !== "active")
  //   return next(
  //     new AppError(
  //       "Cannot invest now in this project! Please come back later!",
  //       400
  //     )
  //   );

  if (req.body.amount < 0)
    return next(new AppError("Please enter valid amount!", 400));

  // Stripe ka kaam in the following controller
  const result = await handlePayment.HandlePayments(req, res, next);

  if (project.fundsRaised >= project.investmentGoal) {
    await Project.findByIdAndUpdate(project._id, {
      fundsRaised: project.investmentGoal,
    });
    return next(
      new AppError(
        "Investment goal already reached. No further funds are required!",
        400
      )
    );
  }

  try {
    console.log("Amound: ", req.body.project.price);
    const re = await Project.findByIdAndUpdate(project._id, {
      $push: { investors: req.user._id },
      $inc: { fundsRaised: req.body.project.price },
    });
    console.log("Project", re);
    console.log("Sending", await Investment.find());
    const investment = await Investment.create({
      project: project._id,
      investor: req.user._id,
      amount: req.body.project.price,
      //  equityAcquired: req.body.equityAcquired,
      // investmentDate: req.body.investmentDate,
    });

    console.log("Sending", investment);
    res.status(200).json({
      status: "success",
      data: {
        investment,
      },
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});
