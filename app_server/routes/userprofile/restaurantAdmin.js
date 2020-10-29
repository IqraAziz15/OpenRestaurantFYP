var express = require('express');
var router = express.Router();
const restaurantAdminController = require('../../controllers/userprofile/restaurantAdminController');
var auth = require('../../../middleware/auth')

/**
 * @route   POST routes/userprofile/restaurantadmin/loginrestaurantadmin
 * @desc    Login user
 * @access  Public
 */

router.post('/loginrestaurantadmin', restaurantAdminController.restaurantAdminLogin);

/**
 * @route   POST routes/userprofile/restaurantadmin/registerrestaurantadmin
 * @desc    Register new user
 * @access  Public
 */

router.post('/registerrestaurantadmin', restaurantAdminController.restaurantAdminRegister);

/**
 * @route   GET userprofile/restaurantadmin/restaurantadmin
 * @desc    Get user data
 * @access  Private
 */

router.get('/restaurantadmin', auth, restaurantAdminController.restaurantAdminProfile);

module.exports = router;
