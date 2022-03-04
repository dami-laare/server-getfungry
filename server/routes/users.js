const express = require('express');
const { generateOTP, generateInviteCode, validateInviteCode, verifyOTP } = require('../controllers/userController');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth');

const router = express.Router();

router.route('/user/sendOTP').post(generateOTP);
router.route('/admin/generate').get(isAuthenticated, isAuthorized('admin'), generateInviteCode);
router.route('/invite/validate').post(validateInviteCode);
router.route('/otp/verify').post(isAuthenticated, verifyOTP);

module.exports = router;