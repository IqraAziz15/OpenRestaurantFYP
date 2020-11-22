var Order = require('../../models/order');

exports.addOrder = (function(req, res, next) {
    Order.create(req.body)
            .then((order) => {
            console.log('Order has been Added ', order);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(order);
        }, (err) => next(err))
        .catch((err) => next(err));
});

exports.viewOrder = (function(req, res, next) {
    Order.findOne({orderid:req.body.orderId}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});