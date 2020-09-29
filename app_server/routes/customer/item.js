var express = require('express');
var router = express.Router();
const itemController = require('../../controllers/customer/itemController');

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/restaurants', itemController.findItem);

module.exports = router;