var Cart = require('../../models/cart')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addCart = (function(req, res, next) {
    Cart.create(req.body).then((cart)=>{
        console.log('Cart has been added', cart);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(cart);
      }, (err) => next(err)).catch((err)=>next(err));
});

exports.addItemsToCart = ((req, res, next) => {
    Cart.findOneAndUpdate({ _id: req.body.cid }, {
        "$push": {
            "items": [
                {
                    item: req.body.id,
                    quantity: req.body.qid
                }
            ]
        }
    }, { new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });   
});

exports.addDealsToCart = ((req, res) => {
    Cart.findOneAndUpdate({ _id: req.body.sid }, {
        "$push": {
            "deals": [
                {
                    deal: req.body.id,
                    quantity: req.body.qid
                }
            ]
        }
    }, { new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });   
});
