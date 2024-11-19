const User = require('./../models/userModel')
const catchAync = require('./../utils/catchAsync')

exports.GetUserById = catchAync(async (req, res, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new AppError("User does not exists!", 400))
    }

    res.status(200).json({
        status: "success",
        data: user
    })
})

exports.GetMe = catchAync(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        return next(new AppError("User not found!", 400))
    }

    res.status(200).json({
        status: "success",
        data: user
    });
});

exports.UpdateMe = catchAync(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
        return next(new AppError("Update your password through /api/auth/updatepassword route", 400))
    }

    if (req.body.role) {
        return next(new AppError("You can't update your role now!", 400))
    }

    const user = await User.findByIdAndUpdate(req.user._id, req.body)

    res.status(200).json({
        status: "success",
        user: user
    })
});

exports.DeleteMe = catchAync(async (req, res, next) => {

    await User.findByIdAndDelete(req.user._id)
    res.status(200).json({
        status: "success",
        message: "user deleted!"
    })
});