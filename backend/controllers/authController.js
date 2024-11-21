const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const AppError = require('./../utils/appError');
const catchAync = require('./../utils/catchAsync');
const { promisify } = require("util");


const GetToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_Expires_In });
};

const CreateSendToken = (user, statusCode, res) => {
    const token = GetToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_In * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: "success",
        token,
        user,
    });
};

const otpStore = new Map();

const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: "upstarterss@gmail.com",
        pass: "ziyi grtp ltbe dpuj",
    },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Signup with OTP
exports.SignUp = catchAync(async (req, res, next) => {
    const { name, username, password, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        return next(new AppError("Passwords do not match.", 400));
    }

    // Generate OTP and save user data temporarily
    const otp = generateOTP();
    otpStore.set(email, { otp, name, username, password, confirmPassword });

    console.log("One time password is:", otp);

    // Send OTP email
    const mailOptions = {
        from: "upstarterss@gmail.com",
        to: email,
        subject: "Email Verification - OTP",
        text: `Your OTP for verification is: ${otp}`,
    };

    auth.sendMail(mailOptions, async (error) => {
        if (error) {
            console.log("Error is:", error);
            return next(new AppError("Error sending OTP email. Please try again later.", 500));
        }

        res.status(200).json({
            status: "success",
            message: "OTP sent to your email. Please verify to complete signup.",
        });
    });
});

// Verify OTP and complete signup
exports.VerifyOTP = catchAync(async (req, res, next) => {
    const { email, otp } = req.body;

    const storedData = otpStore.get(email);

    // Check if OTP and user data exist
    if (!storedData || storedData.otp !== parseInt(otp)) {
        return next(new AppError("Invalid or expired OTP.", 400));
    }

    const { name, username, password, confirmPassword } = storedData;

    // OTP is verified, create user
    const user = await User.create({
        name,
        username,
        email,
        password,
        confirmPassword
    });

    // Clear OTP and user data from the store
    otpStore.delete(email);

    CreateSendToken(user, 200, res);
});

exports.LogIn = catchAync(async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username }).select('+password')

    if (!user) {
        return next(new AppError('User does not exists!😂', 400))
    }

    if (!await user.CorrectPassword(password, user.password)) {
        return next(new AppError('Wrong password.🤬', 400))
    }

    CreateSendToken(user, 200, res)
})


exports.Protect = catchAync(async (req, res, next) => {

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401))
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(new AppError('The user belonging to this token does not exist.', 401));
    }

    req.user = currentUser;
    // res.locals.user = currentUser;
    next();
});


exports.RestrictTo = (...roles) => { // Store parameters in an array

    // console.log('--')
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action.', 403));
        }

        next();
    };
};

exports.UpdatePassword = catchAync(async (req, res, next) => {

    if (!req.body.oldpassword || !req.body.newpassword || !req.body.confirmnewpassword) {
        return next(new AppError('Please enter all fields!', 400));
    }

    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
        return next(new AppError('User not found!', 404));
    }

    const isCorrect = await bcrypt.compare(req.body.oldpassword, user.password);

    if (!isCorrect) {
        return next(new AppError('Old password is incorrect!', 401));
    }

    if (req.body.newpassword !== req.body.confirmnewpassword) {
        return next(new AppError('Passwords do not match!', 400));
    }

    user.password = req.body.newpassword;
    user.confirmPassword = req.body.confirmnewpassword;

    await user.save({ validateBeforeSave: true }); // Validate the new password against the schema

    res.status(200).json({
        status: "success",
        message: "Password updated!",
        user
    });
});