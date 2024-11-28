const Project = require("./../models/projectModel");
const catchAync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { uploadOnCloudinary } = require("./../utils/cloudinary");
const fs = require("fs"); // To delete local files

exports.AddProject = catchAync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please upload an image!", 400));
  }
  // Upload the image to Cloudinary
  const url = await uploadOnCloudinary(req.file.path);

  if (url) fs.unlinkSync(req.file.path);

  if (!url)
    return next(
      new AppError("Cloudinary upload failed. Image URL is missing.", 500)
    );

  // Create the project with the Cloudinary URL
  const newProj = await Project.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    investmentGoal: req.body.fundingGoal,
    creator: req.user._id,
    image: url, // Save the Cloudinary URL in the database
  });

  res.status(200).json({
    status: "Success",
  });
});

exports.All_Active_Projects = catchAync(async (req, res, next) => {
  const projects = await Project.find({ status: "active" });

  res.status(200).json({
    status: "success",
    length: projects.length,
    data: { projects },
  });
});

exports.All_Projects = catchAync(async (req, res, next) => {
  let projects = await Project.find().populate("creator");
  for (let i = 0; i < projects.length; i++) {
    projects[i].creator = {
      name: projects[i].creator.name,
      id: projects[i].id,
    };
  }
  res.status(200).json({
    status: "success",
    length: projects.length,
    data: projects,
  });
});

exports.GetProjectByID = catchAync(async (req, res, next) => {
  const project = await Project.findById({ _id: req.params.id }).populate(
    "creator"
  );
  console.log(project);
  project.creator = {
    name: project.creator.name,
    id: project.id,
  };
  if (!project) return next(new AppError("Project not found!", 400));
  // if (project.status !== "active")
  //   return next(new AppError("Cannot see this project! Come back lator!"));

  res.status(200).json({
    status: "Success",
    data: project,
  });
});

exports.ApproveProject = catchAync(async (req, res, next) => {
  const projectId = req.params.id;
  const project = await Project.findByIdAndUpdate(
    projectId,
    { status: "active" },
    { new: true }
  );

  if (!project) {
    return next(new AppError("Project not found!", 404));
  }

  res.status(200).json({
    status: "success",
    data: project,
  });
});

exports.RejectProject = catchAync(async (req, res, next) => {
  const projectId = req.params.id;
  await Project.findByIdAndDelete(
    projectId,
    { status: "rejected" },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: `project with id:${projectId} deleted!`,
  });
});

exports.UpdateProject = catchAync(async (req, res, next) => {
  const proj = await Project.findById(id);
  if (!proj) {
    return next(new AppError("Project not found!", 400));
  }

  if (proj.creator !== req.user._id) {
    return next(
      new AppError("You do not have permission to update this project!", 400)
    );
  }

  const updatedProj = await Project.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    status: "success",
    message: "Project updated",
    data: updatedProj,
  });
});

exports.ProjectProgress = catchAync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError("Project not found!", 400));
  }

  console.log(project.creator.toString());
  console.log(req.user._id.toString());
  if (
    project.creator.toString() !== req.user._id.toString() &&
    req.user.role != "admin"
  ) {
    return next(new AppError("You do not have permission!", 400));
  }

  const timeRemaining =
    72 - (Date.now() - project.createdAt) / (1000 * 60 * 60);

  res.status(200).json({
    status: "success",
    Project_Progress: {
      Title: project.title,
      "Investment Goal": project.investmentGoal,
      "Funds Raised": project.fundsRaised,
      "Percentage Raised": `${(
        (project.fundsRaised / project.investmentGoal) *
        100
      ).toFixed(2)}%`,
      "Time left": `${Math.max(timeRemaining, 0)} hours`,
      "No. of investors": project.investors.length,
    },
  });
});

exports.DeleteProject = catchAync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    const user = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError("Invalid project ID!", 400));
    }

    const proj = await Project.findById(req.params.id);
    if (!proj) {
      return next(new AppError("Project not found!", 404));
    }

    if (proj.creator.toString() !== user.toString()) {
      return next(new AppError("Not authorized to delete this project!", 403));
    }
  }

  await Project.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "Success",
    message: "Project deleted!",
  });
});
