var express = require('express');
var router = express.Router();
const submenuController = require('../../controllers/restaurantAdmin/submenuController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addsubmenu', submenuController.addSubmenu);

router.post('/additemtosubmenu', submenuController.addItemsToSubmenu);

router.post('/adddealstosubmenu', submenuController.addDealsToSubmenu);

router.post('/getsubmenu/', submenuController.getSubmenuById);

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/removeitemfromsubmenu', submenuController.removeItemFromSubmenu);

module.exports = router;