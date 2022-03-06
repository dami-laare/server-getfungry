const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const User = require('../models/user');
const axios = require("axios");

const apiKey = process.env.MONNIFY_API_KEY;
const apiSecret = process.env.MONNIFY_SECRET_KEY;
const baseUrl = process.env.MONNIFY_BASE_URL;


exports.verifyBVN = catchAsyncErrors(async () => {
    // const user = req.user;

    const clientIDSecretInBase64 = Buffer.from(apiKey + ':' + apiSecret).toString('base64');

    console.log(clientIDSecretInBase64)
})


