var express = require('express');
var router = express.Router();
const orderController = require('../../controllers/customer/orderController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addOrder', orderController.addOrder);

router.post('/viewOrder/', orderController.viewOrder);


module.exports = router;