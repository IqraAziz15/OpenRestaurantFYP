var express = require('express');
var router = express.Router();
const cartController = require('../../controllers/customer/cartController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addcart', cartController.addCart);

router.post('/additemtocart', cartController.addItemsToCart);

router.post('/adddealstocart', cartController.addDealsToCart);

module.exports = router;