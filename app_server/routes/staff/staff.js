var express = require('express');
var router = express.Router();
const staffController = require('../../controllers/staff/staffController');

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewprofile/:id', staffController.viewStaffProfile);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/editprofile/:sid/editname/:name', staffController.editNameInSetting);

router.put('/editprofile/:sid/editusername/:username', staffController.editUsernameInSetting);

router.put('/editprofile/:sid/editemail/:email', staffController.editEmailInSetting);

router.put('/editprofile/:sid/editphonenumber/:phonenumber', staffController.editPhonenumberInSetting);

router.put('/editprofile/:sid/editpassword/:password', staffController.editPasswordInSetting);

router.put('/editprofile/:sid/editpicture/:picture', staffController.editPictureInSetting);

module.exports = router;