var express = require('express');
var router = express.Router();
const waiterController = require('../../controllers/userprofile/waiterController');

/**
 * @route   POST routes/user/loginwaiter
 * @desc    Login user
 * @access  Public
 */

router.post('/loginwaiter', waiterController.waiterLogin);

/**
 * @route   POST routes/user/registerwaiter
 * @desc    Register new user
 * @access  Public
 */

router.post('/registerwaiter', waiterController.waiterRegister);

/**
 * @route   GET user/waiter
 * @desc    Get user data
 * @access  Private
 */

router.get('/waiter', waiterController.waiterProfile);

module.exports = router;
