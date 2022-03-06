const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const generateOTP = require('../utils/generateOTP');
const Invite = require('../models/inviteCode');
const referralCodes = require('referral-codes');
const sendToken = require('../utils/jwt');
const User = require('../models/user');
const sendOTP = require('../utils/sendOTP');
const sendMail = require('../utils/sendMail');
const ErrorHandler = require('../utils/errorHandler');
const MealTicket = require('../models/mealTicket');

//Admin generate an invite code => api/v1/admin/generate 
exports.generateInviteCode = catchAsyncErrors(async (req, res, next) => {
    const code = await referralCodes.generate({
        prefix: 'fungry-',
        length: 20
    })

    const createdBy  = req.user;

    // Deletes previous invite code
    await Invite.deleteOne({index: 1});

    // Creates a new invite code
    await Invite.create({code: code[0], createdBy})

    res.json({
        success: true,
        code: code[0]
    })
});


// Validates an invite code => api/v1/invite/validate/:inviteCode
exports.validateInviteCode = catchAsyncErrors(async (req, res, next) => {
    const code = req.params.inviteCode

    const invite = await Invite.findOne({code});

    if(!invite || invite.status === 'used'){
        return next(new ErrorHandler('Invite code is invalid', 401));
    }

    invite.status = 'used';

    await invite.save();

    res.status(200).json({
        success: true
    })
});

// Register a new user => api/v1/user/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    let { phone, name, email } = req.body;

    let formattedPhone = phone.replace(/0/, '+234');

    const preExistingUser = await User.findOne({phone});

    const otp = await generateOTP();

    if(preExistingUser) {
        try{
            // await sendOTP(otp, formattedPhone);
            await sendMail(email, otp, next)
        }catch(err){
            return next(new ErrorHandler(err.message, 400))
    
        }

        preExistingUser.otp = otp;

        preExistingUser.otpExpire = new Date(Date.now() + 10 * 60 * 1000)

        await preExistingUser.save();
    
        return sendToken(preExistingUser, 200, res)
    }

    
    try{
        // await sendOTP(otp, formattedPhone);
        await sendMail(email, otp, next)
    }catch(err){
        return next(new ErrorHandler(err.message, 400))

    }
    const user = await User.create({
        phone, 
        name,
        email, 
        otp,
        otpExpire: new Date(Date.now() + 10 * 60 * 1000)
    });

    sendToken(user, 200, res)

});

// Login user ==? api/v1/user/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {phone, pin} = req.body;
    const user = await User.findOne({phone}).select('+pin');

    if(!user) {
        return next(new ErrorHandler('User does not exist', 400))
    }

    const isPinMatched = await user.comparePin(pin);

    if(!isPinMatched) {
        return next(new ErrorHandler('Invalid PIN', 401));
    }
    sendToken(user, 201, res);
})

// Logout user /api/v1/logout

exports.logoutUser = catchAsyncErrors( async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler('You are already logged out', 400))
    };

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200).json({
        success: true,
        message: 'You have successfully logged out'
    });
});


// Verify OTP ==> api/v1/otp/verify
exports.verifyOTP = catchAsyncErrors(async (req, res, next) => {
    const {otp} = req.body;
    const user = req.user;

    const date = new Date(Date.now())

    if(user.otp !== otp || date.getTime() > user.otpExpire.getTime()) {
        return next(new ErrorHandler('OTP is either invalid or has expired', 400))
    }

    sendToken(user, 200, res)

    user.otp = null;
    user.otpExpire = null;

    await user.save()
})

// Add other user details ==> api/v1/user/pin/new
exports.addPin = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;

    user.pin = req.body.pin;

    await user.save();

    sendToken(user, 200, res);
})

// Generates meal ticket ==> api/v1/ticket
exports.generateMealTicket = catchAsyncErrors(async (req, res, next) => {
    const {value} = req.body
    const createdBy = req.user

    let date = new Date(Date.now());

    date.setHours(24)
    date.setMinutes(59)
    date.setSeconds(59)


    const ticket = await MealTicket.create({createdBy, expires: date, value})

    res.status(200).json({
        success: true,
        ticket
    })
})