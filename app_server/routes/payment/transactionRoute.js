var express = require('express');
var router = express.Router();
const transControllers = require("../../controllers/payment/transactionController");
  
//   /api/transactions/
    router.post("/savetransaction",transControllers.saveTransaction);
    router.post("/gettransaction", transControllers.getTransaction);
    router.get("/getalltransactions", transControllers.getAllTransactions);
    router.post("/customer/gettransactions", transControllers.getTransactionsCustomer);
    router.post("/restaurant/gettransactions", transControllers.getTransactionsRestaurant);
    router.post("/removetransaction", transControllers.removeTransaction);

  module.exports = router;
