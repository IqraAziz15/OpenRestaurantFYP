var Order = require('../../models/order');
var Item = require('../../models/item');
var Deal = require('../../models/deal');
const Pusher = require("pusher");
const { Parser } = require('json2csv');
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

exports.addOrder = (async (req, res, next) => {
    var rest_id = ''; var body;
    if (req.body.type == 1) {
        var type = 'card'
    }
    else {
        var type = 'cod'
    }
    await req.body.ordered_food.forEach(async (rest) => {
        rest_id = rest.id;
        body = {
            orderid: req.body.orderid,
            giftcoupon: req.body.giftcoupon,
            customer_id: req.body.customer_id,
            rest_id: rest_id,
            ordered_food: rest.rest,
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
    await Order.find({ orderid: req.body.orderid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });

});

exports.viewCustomerOrder = (function (req, res, next) {
    Order.find({ orderid: req.body.orderid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewOrderCustomer = (function (req, res, next) {
    Order.find({ customer_id: req.body.cid, orderid: req.body.orderid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllCustomerOrders = (function (req, res, next) {
    Order.find({ customer_id: req.body.cid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrders = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersCurrent = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Pending" }).exec(function (error, results) {

        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersPrepared = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Ready" }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersComplete = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Complete" }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewOrder = (function (req, res, next) {
    Order.find({ orderid: req.body.orderId }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


exports.extractWordsOrder = (function(req, res, next) {
    Order.find({customer_id: req.body.cid, orderid:req.body.orderId}).exec(async (error, results) => {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        let Items = [];
        // message.info('we are inside')
        if(results){
            results.forEach(rest => {
                // console.log('c')
                rest.ordered_food.forEach(item => {
                    Items.push(item.id);
                })

            });
            var items = await Item.find({ '_id': { $in: Items } }).select('name description')
            var deals = await Deal.find({ '_id': { $in: Items } }).select('name description')
            var list = items.concat(deals);
            list.forEach(item =>{
                item.name = item.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase()
                item.description = item.description.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase()
                StringsList = StringsList.concat(item.name.split(' '));
                StringsList = StringsList.concat(item.description.split(' '));
            })
            res.json(StringsList);
        }
        res.json(null);

    });
});

exports.getAllOrders = (function (req, res) {
    var order = Order.find()
        .then((order) => {
            console.log("order");
            console.log(order);
            res.status(200).json(
                order
            );
        })
        .catch(err => console.log(err));
});

exports.setStatus = (function (req, res, next) {
    Order.findOneAndUpdate({ orderid: req.body.orderid, rest_id: req.body.restid }, { status: req.body.status }, { new: true }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.setDeliveredStatus = (function (req, res, next) {
    Order.findOneAndUpdate({ orderid: req.body.orderid, rest_id: req.body.restid }, { status: req.body.status, delivered: req.body.delivered }, { new: true }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.waiterReadyOrders = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Ready", payment_method: 'cod', delivered: false }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.waiterCompleteOrders = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Complete", delivered: true }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.getOrdersForCSV = (function (req, res, next) {
    Order.find({ rest_id: req.params.restid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        var orderData = []
        Item.find().exec(function (err, itemres) {
            if (err) {
                return next(err);
            }
            Deal.find().exec(function (err, dealres) {
                if (err) {
                    return next(err);
                }
            results.forEach(order => {
                order.ordered_food.forEach(item => {
                    itemres.forEach(i => {
                        if (item.id == i._id) {
                            order.iid=item.id;
                            order.item_name=i.name;
                            order.price=i.price;
                            order.quantity=item.quantity;
                            orderData.push(order);
                        }
                    })
                    dealres.forEach(d => {
                        if (item.id == d._id) {
                            order.did=item.id;
                            order.deal_name=d.name;
                            order.dealprice=d.total_bill;
                            order.dealquantity=item.quantity;
                            orderData.push(order);
                        }
                    })

                })

            })
            const fields = [
                {
                    label: 'OrderID',
                    value: 'orderid'
                },
                {
                    label: 'Id',
                    value: '_id'
                },
                {
                    label: 'RestID',
                    value: 'rest_id'
                },
                {
                    label: 'ItemId',
                    value: 'iid'
                },
                {
                    label: 'ItemName',
                    value: 'item_name'
                },
                {
                    label: 'ItemPrice',
                    value: 'price'
                },
                {
                    label: 'ItemQuantity',
                    value: 'quantity'
                },
                {
                    label: 'DealId',
                    value: 'did'
                },
                {
                    label: 'DealName',
                    value: 'deal_name'
                },
                {
                    label: 'DealPrice',
                    value: 'dealtotal'
                },
                {
                    label: 'DealQuantity',
                    value: 'dealquantity'
                },
                {
                    label: 'TotalBill',
                    value: 'total_bill'
                },
                {
                    label: 'OrderTime',
                    value: 'ordertime'
                },
                {
                    label: 'Payment Method',
                    value: 'payment_method'
                }
            ];
            // Respond with valid data
            return downloadResource(res, 'orders.csv', fields, orderData);
        })
        })
    });
});

downloadResource = (res, fileName, fields, data) => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
}

exports.getOrdersJSON = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Complete" }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        var itemres = Item.find();
        var dealres = Deal.find();
        var ordersarray = [], itemsarray=[]
        results.forEach(order => {
            var pm = order.payment_method
            ordersarray.push(pm)
            var ot = order.ordertime
            ordersarray.push(ot)
            var tb = order.total_bill
            ordersarray.push(tb)
            order.ordered_food.forEach(item => {
                var totalitems=0, totaldeals=0
                itemres.forEach(i => {
                    if (item.id == i._id) {
                        order.iid=item.id;
                        order.item_name=i.name;
                        order.price=i.price;
                        order.quantity=item.quantity;
                        totalitems = (order.price * order.quantity) +totalitems
                        itemsarray.push(order);
                    }
                })
                dealres.forEach(d => {
                    if (item.id == d._id) {
                        order.did=item.id;
                        order.deal_name=d.name;
                        order.dealprice=d.total_bill;
                        order.dealquantity=item.quantity;
                        totaldeals = (order.price * order.quantity) +totaldeals
                        itemsarray.push(order);
                    }
                })

            })
        })

        for(var i=0; i<ordersarray.length;i++)
        {
            var cod=0, card=0;
            ordersarray.forEach(order => {
                if(order.payment_method == 'cod')
                {
                    cod=+cod
                }
                else
                {
                    card=+card
                }
            })
            var quantity=0,price=0,total_bill=0
            itemsarray.forEach(item => {
                if(item.quantity)
                {
                    quantity=+item.quantity
                }
                else if(item.price)
                {
                    price=+item.price
                }
                else if(item.total_bill)
                {
                    total_bill=+item.total_bill
                }
            })
            
        }
        // Respond with valid data
        res.json(results);
    });
})

//first you will get all orders
//next you will remove ordered_food array from orders and concat it to new array of items
//from the remaining ordered array, you will retrieve info like, how many orders were cod one and how many where paid by card
//And you will count unique orderids, and note it down that all the orders that you are retrieving are completed one, ok?
//also you can retreive no of orders on a spacific data, or specific interval of days
//Now its time for items, yoohooo
//for items, you will first get all items and deals present in that restaurant
//Then, you will use a loop and add all the quantities of an items frm orgered list and save it in the item you fetched just now
//then you will have, item id, name, total quantity/amount of that item ordered so far, price per unit, and blah blah
//now you know which item was the most selling item, and which one was waste of space in menu
//now multiply the quantity with price, and you will get to know that which item saved you the most and showered you with money
//note that price for deals and items has different names, so first, before doing all this work, merge deals and items in one array, with same name for same attribute.
//I think thats enough for now
//Au revior

