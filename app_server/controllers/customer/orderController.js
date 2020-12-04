var Order = require('../../models/order');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1114675",
  key: "98bd0af8e51670d6785d",
  secret: "e3f7e65a4e8e33458696",
  cluster: "ap2",
  useTLS: true
});


exports.addOrder = (function(req, res, next) {
    Order.create(req.body)
            .then((order) => {
                pusher.trigger("rest-name", "orders", {
                    order
                  });                  
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

exports.getAllOrders = (function(req, res){
    var order =Order.find()
    .then((order)=>{
        console.log("order");
        console.log(order);
        res.status(200).json(
            order 
        ); 
    })
    .catch(err=>console.log(err));
});