var express = require('express');
var router = express.Router();
var Waiter = require('../models/waiter');
var Order = require('../models/order');
var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
var Review = require('../models/review');


router.get('/', function(req, res, next) {
    res.send('Waiter Dashboard');
});
//testing
router.get('/view', function(req, res, next) {
    Waiter.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/viewprofile/:id', function(req, res, next){
    console.log(req.params.id);
    Waiter.findById(req.params.id)
        .then((waiter) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(waiter);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.get('/vieworder/:id', function(req, res, next){
    Order.findById(req.params.id)
        .then((order) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(order);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.post('/order/:wid/acceptorder/:oid', function(req, res, next) {
    Order.findById(req.params.oid)
    .then((order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
    Waiter.find({_id : req.params.wid}).populate(order).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});
//testing
router.post('/addwaiter', function(req, res, next) {
    Waiter.create(req.body)
            .then((waiter) => {
            console.log('Waiter has been Added ', waiter);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(waiter);
        }, (err) => next(err))
        .catch((err) => next(err));
});
router.post('/addrest', function(req, res, next) {
   Restaurant.create(req.body)
            .then((waiter) => {
            console.log('Restaurnat has been Added ', waiter);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(waiter);
        }, (err) => next(err))
        .catch((err) => next(err));
});
router.post('/addreview', function(req, res, next) {
    Review.create(req.body)
             .then((waiter) => {
             console.log('Rv has been Added ', waiter);
             res.statusCode = 200;
             res.setHeader('Content-Type', 'application/json');
             res.json(waiter);
         }, (err) => next(err))
         .catch((err) => next(err));
 });

 router.put('/assign/:cid/review/:sid', function(req, res, next) {
    Restaurant.findOneAndUpdate({ _id: req.params.cid }, {
            "$push": {
                "reviews": {
                    "review": req.params.sid
                }
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
router.get('/rests', function(req, res, next) {
    Restaurant.find({}).populate('reviews.review').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
router.post('/addmenu', function(req, res, next) {
    Menu.create(req.body)
            .then((waiter) => {
            console.log('Menu has been Added ', waiter);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(waiter);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.put('/editprofile/:wid/editname/:name', function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{name:req.params.name},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:/wid/editusername/:username', function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{username:req.params.username},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:wid/editemail/:email', function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{email:params.body.email},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:wid/editphonenumber/:phonenumber', function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{phonenumber:req.params.phonenumber},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:wid/editpassword/:password', function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{password:req.params.password},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:wid/editstatus/:status', function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{status:req.params.status},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});
//review later
router.put('/editprofile/:wid/editpicture/:picture', function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{picture:req.params.picture},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

module.exports = router;