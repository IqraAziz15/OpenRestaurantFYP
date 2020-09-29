var express = require('express');
var router = express.Router();
const menuController = require('../../controllers/restaurantAdmin/menuController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/additem', menuController.addMenu);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewitem', menuController.viewMenu);

module.exports = router;