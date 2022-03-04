const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const generateOTP = require('../utils/generateOTP');
const Invite = require('../models/inviteCode');
const referralCodes = require('referral-codes');
const sendToken = require('../utils/jwt');
const User = require('../models/user');
const sendOTP = require('../utils/sendOTP');
const ErrorHandler = require('../utils/errorHandler');
const MealTicket = require('../models/mealTicket');

//Admin generate an invite code => api/v1/admin/generate 
exports.generateInviteCode = catchAsyncErrors(async (req, res, next) => {
    const code = await referralCodes.generate({
        prefix: 'fungry-',
        length: 20
    })

    const createdBy  = req.user;

    await Invite.create({code: code[0], createdBy})

    res.json({
        success: true,
        code: code[0]
    })
});


// Validates an invite code => api/v1/invite/validate
exports.validateInviteCode = catchAsyncErrors(async (req, res, next) => {
    const {code} = req.body

    const invite = await Invite.findOne({code});

    if(!invite || invite.status === 'used'){
        return next(new ErrorHandler('Invite code is invalid', 400));
    }

    invite.status = 'used';

    await invite.save();

    res.status(200).json({
        success: true
    })
});

// Register a new user => api/v1/user/new
exports.generateOTP = catchAsyncErrors(async (req, res, next) => {
    let { phone, role } = req.body;

    phone = phone.replace(/0/, '+234');

    const preExistingUser = await User.findOne({phone});

    const otp = await generateOTP();

    if(preExistingUser) {
        await sendOTP(otp, phone)

        preExistingUser.otp = otp;

        preExistingUser.otpExpire = new Date(Date.now() + 10 * 60 * 1000)

        await preExistingUser.save();
    
        return sendToken(preExistingUser, 200, res)
    }


    await sendOTP(otp, phone)

    const user = await User.create({
        phone, 
        role, 
        otp,
        otpExpire: new Date(Date.now() + 10 * 60 * 1000)
    });

    sendToken(user, 200, res)

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

// Add other user details ==> api/v1/user/update
exports.updateDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;

    user.pin = req.body.pin;

    user.name = `${req.body.fname} ${req.body.lname}`

    user.email = req.body.email

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