var express = require('express');
var router = express.Router();
const orderController = require('../../controllers/customer/orderController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addOrder', orderController.addOrder);

router.post('/viewOrder/', orderController.viewOrder);

router.get("/getallorders", orderController.getAllOrders);


module.exports = router;