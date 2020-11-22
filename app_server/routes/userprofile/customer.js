var express = require('express');
var router = express.Router();
const customerController = require("../../controllers/userprofile/customerController");



router.post("/registercustomer", customerController.customerRegister);

router.get("/getcustomer/:cid", customerController.getCustomer);


 

module.exports = router;