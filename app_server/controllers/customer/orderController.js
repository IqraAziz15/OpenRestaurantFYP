var Order = require('../../models/order');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1114675",
  key: "98bd0af8e51670d6785d",
  secret: "e3f7e65a4e8e33458696",
  cluster: "ap2",
  useTLS: true
});


// exports.addOrder = (function(req, res, next) {
//     Order.create(req.body)
//             .then((order) => {
//                 pusher.trigger("rest-name", "orders", {
//                     order
//                   });                  
//             console.log('Order has been Added ', order);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(order);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });

exports.addOrder = (async(req, res, next)=> {
    var rest_id = ''; var body; 
    if (req.body.type == 1){
        var type = 'card'
    }
    else {
        var type = 'cod'
    }
    await req.body.ordered_food.forEach(async(rest) =>{
        rest_id=rest.id;
        body = {
            orderid: req.body.orderid,
            giftcoupon: req.body.giftcoupon,
            customer_id: req.body.customer_id,
            rest_id: rest_id,
            ordered_food : rest.rest,
            total_bill: rest.sub_total,
            comments: rest.comments,
            payment_method: type
        }
        await Order.create(body)
            .then((order) => {
                pusher.trigger(`${order.rest_id}`, "orders", {
                    order
                  });                  
            console.log('Order has been Added ', order);
        }, (err) => next(err))
        .catch((err) => next(err));

    })
    await Order.find({orderid:req.body.orderid}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
    
});

exports.viewCustomerOrder = (function(req, res, next) {
    Order.find({orderid:req.body.orderid}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewOrderCustomer = (function(req, res, next) {
    Order.find({customer_id: req.body.cid,orderid:req.body.orderid}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllCustomerOrders = (function(req, res, next) {
    Order.find({customer_id: req.body.cid}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrders = (function(req, res, next) {
    Order.find({rest_id:req.body.restid}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersCurrent = (function(req, res, next) {
    Order.find({rest_id:req.body.restid , status: "Pending"}).exec(function(error, results) {
        
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersPrepared = (function(req, res, next) {
    Order.find({rest_id:req.body.restid, status: "Ready"}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersComplete = (function(req, res, next) {
    Order.find({rest_id:req.body.restid, status: "Complete"}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
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

exports.setStatus = (function(req, res, next) {
    Order.findOneAndUpdate({orderid:req.body.orderid,rest_id:req.body.restid} , {status: req.body.status},{ new: true }).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.setDeliveredStatus = (function(req, res, next) {
    Order.findOneAndUpdate({orderid:req.body.orderid,rest_id:req.body.restid} , {status: req.body.status,delivered: req.body.delivered},{ new: true }).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.waiterReadyOrders = (function(req, res, next) {
    Order.find({rest_id:req.body.restid, status: "Ready", payment_method:'cod', delivered: false}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.waiterCompleteOrders = (function(req, res, next) {
    Order.find({rest_id:req.body.restid, status: "Complete", delivered: true}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


