var mongoose = require('mongoose');
// var Cart = require('../../models/cart')
var Customer = require('../../models/customer');
var Item = require('../../models/item');
var Deal = require('../../models/deal');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

// exports.addCart = (function(req, res, next) {
//     Cart.create(req.body).then((cart)=>{
//         console.log('Cart has been added', cart);
//         res.statusCode=200;
//         res.setHeader('content-type', 'application/json');
//         res.json(cart);
//       }, (err) => next(err)).catch((err)=>next(err));
// });


// router.put('/editalarm/:id/alarm/:aid', function(req, res, next) {
//     Machine.findById(req.params.id)
//          .then((machine) => {
//              res.statusCode = 200;
//              res.setHeader('Content-Type', 'application/json');
//              machine.update({'alarms.id': req.params.aid}, {'$set': {
//               'alarms.$.date': req.body.date,
//               'alarms.$.status': req.body.status
//           }}).then((result) => 
//           {
//            res.json(result);
        
//           }).catch((err) => next(err));
             
//           } ).catch((err) => next(err));
   
//    });



// exports.addItemsToCart = ((req, res, next) => {
//     // c = new Cart();
//     // quantity = c.quantity;
//     var item = '';
//     // var id = mongoose.Types.ObjectId(req.body.id);
//     try {
//         item = Cart.findOne({_id: req.body.cid, "items.item": req.body.id});
//     }
//     // console.log('hghg')
//     catch{
//         console.log('fmskdkdkd')
//     }
//     if (item){
//         console.log('hghghgjhg')
//         Cart.findById(req.body.cid)
//         .then((cart) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             cart.update({'items.item': req.body.id}, {'$set': {
//                 $inc: {'quantity': req.body.quantity}
//          }}).then((result) => 
//          {
//           res.json(result);
       
//          }).catch((err) => next(err));
//          }).catch((err) => next(err));
//     }
//     else{
//     Cart.findOneAndUpdate({ _id: req.body.cid }, {
//         "$push": {
//             "items": [
//                 {
//                     item: req.body.id,
//                     quantity: req.body.quantity
//                 }
//             ]
//         }
//     }, { new: true, upsert: false },
//     function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//     }); 
// }  
// });

// exports.addDealsToCart = ((req, res) => {
//     Cart.findOneAndUpdate({ _id: req.body.did }, {
//         "$push": {
//             "deals": [
//                 {
//                     deal: req.body.id,
//                     quantity: req.body.quantity
//                 }
//             ]
//         }
//     }, { new: true, upsert: false },
//     function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//     });   
// });

// exports.getCartById = (function(req, res, next) {
//     Cart.findOne({_id: req.body.id}).exec(function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//     });
// });


exports.addCart = function(req, res) {

    Customer.findOne({ _id: req.body.cid }, (err, userInfo) => {
        if (err){
            return err;
        }
        let duplicate = false;
        console.log(req.body.cid +'.............................'+ req.body.iid)
        console.log(userInfo)
        if( userInfo.cart.length > 0){
            userInfo.cart.forEach((item) => {
                if (item.id == req.body.iid) {
                    duplicate = true;
                }
            })
        }
 
        if (duplicate) {
            Customer.findOneAndUpdate(
                { _id: req.body.cid, "cart.id": req.body.iid },
                { $inc: { "cart.$.quantity": req.body.quantity } },
                { new: false },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            Customer.findOneAndUpdate(
                { _id: req.body.cid },
                {
                    $push: {
                        cart: {
                            id: req.body.iid,
                            quantity: req.body.quantity,
                            // date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
};

exports.getCartItems = async(req, res) => {
    let type = req.body.type
    let productIds = req.body.id

    console.log("req.query.id", req.body.id)
    req.body.id = req.body.id.toString();
    console.log("req.query.id", req.body.id)
    if (type === "array") {
        let ids = req.body.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        }) 
    }

    console.log("productIds", productIds)
    var i = false;
    var d = false;
    var resp = null;
    //we need to find the product information that belong to product Id 
    await Item.find({ '_id': { $in: productIds } }).select('-image')
        .exec((err, product) => {
            if (err) {
                resp = err;
            }
            else if (product){
                // if (resp) {
                //     for(var i; i<product; i++)
                //         resp.push(product[i])
                // }
                // else resp = product
                resp = product
            }
            console.log('pro'+ product)
            console.log('respin'+ resp)
            i = true;
        });
    await Deal.find({ '_id': { $in: productIds } }).select('-image')
        .exec((err, product) => {
            if (err) {
                resp = err;
            }
            else if (product)
            {
                if(product){
                    if (resp) {
                        // for(var i; i<product; i++)
                        //     resp.push(product[i])
                        resp = resp.concat(product)
                    }
                    else resp = product
                }
            }
            console.log('pro'+ product)
            console.log('respin'+ resp)
            d = true;
            // while (!i && !d){

            // }
            return res.status(200).json(resp)
            
        });

};

exports.removeFromCart = async(req, res) => {
    let array; let cart; 
    // let x=true;
    await Customer.findOneAndUpdate(
        { _id: req.body.cid },
        {
            "$pull":
                { "cart": { "id": req.body.itemid } }
        },
        { new: true },
        (err, userInfo) => {
            cart = userInfo.cart;
            array = cart.map(item => {
                return item.id
            })
            return res.status(200).json({
                cart
          })
        }
        
    )
    console.log(array)

    // while (x){

    // }
            // Item.find({ '_id': { $in: array } })
            //     .exec((err, cartDetail) => {
            //         return res.status(200).json({
            //             cartDetail,
            //             cart
            //         })
            //     })
    
    // var i = false;
    // var d = false;
    // var resp = null;
    // //we need to find the product information that belong to product Id 
    // await Item.find({ '_id': { $in: array } }).select('-image')
    //     .exec((err, product) => {
    //         if (err) {
    //             resp = err;
    //         }
    //         else if (product.length > 0){
    //             if (resp) {
    //                 resp = resp.concat(product)
    //             }
    //             else resp = product
    //         }
    //         console.log('pro'+ product)
    //         console.log('respin'+ resp)
    //         i = true;
    //     });
    // await Deal.find({ '_id': { $in: array } }).select('-image')
    //     .exec((err, product) => {
    //         if (err) {
    //             resp = err;
    //         }
    //         else if (product.length > 0)
    //         {
    //             if (resp) {
    //                 resp = resp.concat(product)
    //             }
    //             else resp = product
    //         }
    //         console.log('pro'+ product)
    //         console.log('respin'+ resp)
    //         d = true;
    //         // while (!i && !d){

    //         // }
    //         return res.status(200).json({
    //               cartDetail : resp,
    //               cart
    //       })
    //     });
    
}



