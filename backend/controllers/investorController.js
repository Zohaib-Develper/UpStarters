const AppError = require('./../utils/appError')
const catchAync = require('./../utils/catchAsync')
const User = require('../models/userModel')
const Investments = require('../models/investmentModel')

exports.GetInvestmentdata = catchAync(async (req, res, next) => {

    const user = await User.findById(req.user._id) // Current user

    if (!user) {
        return next(new AppError('User not found!', 400))
    }

    const investments = await Investments.find({ investor: user._id })

    if (!investments || investments.length === 0) {
        return next(new AppError('No investments found!', 400))
    }

    res.status(200).json({
        status: "Success",
        data: {
            investments
        }
    })


});

exports.AllInvestors = catchAync(async (req, res, next) => {

    const investors = await Investments.find()
        .populate('investor', 'name email')
        .populate('project', 'title description')
        .select('amount equityAcquired investmentDate');


    if (!investors || investors.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'No investors found',
        });
    }

    res.status(200).json({
        status: 'success',
        results: investors.length,
        data: {
            investors,
        },
    });
});