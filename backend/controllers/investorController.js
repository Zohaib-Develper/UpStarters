const Investor = require('./../models/investorModel')
const AppError = require('./../utils/appError')
const catchAync = require('./../utils/catchAsync')

exports.GetInvestmentdata = catchAync(async (req, res, next) => {

        const investor = await Investor.findOne({ user: req.user._id }).populate('investments');
        // const investor = await Investor.findOne({ user: req.user._id })
        // .populate({
        //     path: 'investments', // Populate the investments field
        //     populate: { // If you want to populate details of projects related to investments
        //     path: 'project', // Assuming each investment references a project
        //     model: 'Project' // The name of the model to populate
        //     }
        // });


        if (!investor) {
            return next(new AppError('Investor not found!', 404))
        }

        // const investments = await Investment.find({ _id: { $in: investor.investments } })

        if (!investor.investments || investor.investments.length === 0) {
            return next(new AppError('No investments found!', 404))
        }

        res.status(200).json({
            status: "success",
            investments : investor.investments
        });

});

exports.AllInvestors = catchAync(async (req, res, next) =>{
        const investors = await Investor.find().populate('user');

        if (investors.length === 0) {
            return next(new AppError('No investors found!', 404))
        }

        const users = investors.map(investor => ({
            _id: investor.user._id,
            name: investor.user.name,
            email: investor.user.email,
            role: investor.user.role,
        }));

        res.status(200).json({
            status: "success",
            investors : users 
        });
});
