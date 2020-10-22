var express = require('express');
var router = express.Router();
const settingController = require('../../controllers/restaurantAdmin/settingController');

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/editusername/:rid', settingController.editUsernameInSetting);

module.exports = router;