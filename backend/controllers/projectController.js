const Project = require('./../models/projectModel');
const catchAync = require('./../utils/catchAsync')

exports.AddProject = catchAync(async (req, res, next) => {

  const creator_id = req.user._id

  const newProj = await Project.create({
    title: req.body.title,
    summary: req.body.summary,
    description: req.body.description,
    investmentGoal: req.body.investmentGoal,
    equityOffered: req.body.equityOffered,
    fundsRaised: req.body.fundsRaised,
    creator: creator_id
  });

  res.status(201).json({
    status: "Success",
    data: newProj
  });

});

exports.All_Active_Projects = catchAync(async (req, res, next) => {

  const projects = await Project.find({ status: 'active' })

  res.status(200).json({
    status: "success",
    length: projects.length,
    data: { projects }
  })

});

exports.All_Projects = catchAync(async (req, res, next) => {

  const projects = await Project.find()

  res.status(200).json({
    status: "success",
    length: projects.length,
    data: { projects }
  })
})

exports.GetProjectByID = catchAync(async (req, res, next) => {

  const project = await Project.findById({ _id: req.params.id })

  if (!project) {
    return next(new AppError('Project not found!', 400))
  }

  res.status(200).json({
    status: "Sucess",
    data: project
  })

})


exports.ApproveProject = catchAync(async (req, res, next) => {

  const projectId = req.params.id;
  const project = await Project.findByIdAndUpdate(projectId, { status: 'active' }, { new: true });

  if (!project) {
    return next(new AppError('Project not found!', 404))
  }

  res.status(200).json({
    status: 'success',
    data: project
  });
});

exports.RejectProject = catchAync(async (req, res, next) => {

  const projectId = req.params.id;
  await Project.findByIdAndDelete(projectId, { status: 'rejected' }, { new: true });

  res.status(200).json({
    status: 'success',
    message: `project with id:${projectId} deleted!`
  });
});

exports.UpdateProject = catchAync(async (req, res, next) => {

  const proj = await Project.findById(id);
  if (!proj) {
    return next(new AppError('Project not found!', 400))
  }

  if (proj.creator !== req.user._id) {
    return next(new AppError('You do not have permission to update this project!', 400))
  }

  const updatedProj = await Project.findByIdAndUpdate(id, req.body)

  res.status(200).json({
    status: "success",
    message: "Project updated",
    data: updatedProj
  })
})

exports.ProjectProgress = catchAync(async (req, res, next) => {

  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new AppError("Project not found!", 400))
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    return next(new AppError("You do not have permission!", 400))
  }

  const timeRemaining = 72 - (Date.now() - project.createdAt) / (1000 * 60 * 60);

  res.status(200).json({
    status: "success",
    Project_Progress: {
      "Title": project.title,
      "Investment Goal": project.investmentGoal,
      "Funds Raised": project.fundsRaised,
      "Percentage Raised": `${((project.fundsRaised / project.investmentGoal) * 100).toFixed(2)}%`,
      "Time left": `${Math.max(timeRemaining, 0)} hours`,
      "No. of investors": project.investors.length
    }
  });
});

exports.DeleteProject = catchAync(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    const user = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(new AppError('Invalid project ID!', 400));
    }

    const proj = await Project.findById(req.params.id);
    if (!proj) {
      return next(new AppError('Project not found!', 404));
    }

    if (proj.creator.toString() !== user.toString()) {
      return next(new AppError('Not authorized to delete this project!', 403));
    }
  }

  await Project.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "Success",
    message: "Project deleted!"
  });
});