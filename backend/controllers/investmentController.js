const Investment = require('./../models/investmentModel')
const Investor = require('./../models/investorModel')
const Project = require('./../models/projectModel');
const AppError = require('./../utils/appError')
const catchAync = require('./../utils/catchAsync')

exports.InvestInProject = catchAync(async (req, res, next) => {
    
    const project = await Project.findById(req.params.id)

    if(!project){
        return next(new AppError('No tour found!', 404))
    }

    if(req.body.amount < 0){
        return next(new AppError('Please enter valid amount!', 400))
    }

    await Project.findByIdAndUpdate(
        project._id,
        { 
            $addToSet: { investors: req.user._id },
            $inc: { fundsRaised: req.body.amount }
        }
    );    
    
    const investment = await Investment.create({
        project : project._id,
        investor : req.user._id,
        amount : req.body.amount,
        equityAcquired : req.body.equityAcquired,
        investmentDate : req.body.investmentDate
    })

    const investor = await Investor.findOneAndUpdate(
        { user: req.user._id },  
        { $addToSet: { investments: investment._id } }, 
    );
        
    res.status(201).json({
        status: "success",
        data: {
            investment,
            investor
        }
    });

});