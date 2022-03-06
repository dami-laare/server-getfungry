const express = require('express');
const { registerUser, generateInviteCode, validateInviteCode, verifyOTP, addPin, generateMealTicket, loginUser, logoutUser } = require('../controllers/controllers');
const { isAuthenticated, isAuthorized } = require('../middlewares/auth');

const router = express.Router();

router.route('/user/register').post(registerUser);
router.route('/admin/generate').get(isAuthenticated, isAuthorized('admin'), generateInviteCode);
router.route('/ticket').post(isAuthenticated, generateMealTicket);
router.route('/invite/validate/:inviteCode').post(validateInviteCode);
router.route('/otp/verify').post(isAuthenticated, verifyOTP);
router.route('/user/pin/new').put(isAuthenticated, addPin);
router.route('/user/login').post(loginUser)
router.route('/user/logout').post(logoutUser)



module.exports = router;