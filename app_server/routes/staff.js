var express = require('express');
var router = express.Router();
var Staff = require('../models/staff');
var Order = require('../models/order');

router.get('/', function(req, res, next) {
    res.send('Staff Dashboard');
});

router.get('/viewprofile/:id', function(req, res, next){
    console.log(req.params.id);
    Staff.findById(req.params.id)
        .then((staff) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(staff);
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

router.put('/editprofile/:sid/editname/:name', function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{name:req.params.name},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:sid/editusername/:username', function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{username:req.params.username},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:sid/editemail/:email', function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{email:params.body.email},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:sid/editphonenumber/:phonenumber', function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{phonenumber:req.params.phonenumber},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

router.put('/editprofile/:sid/editpassword/:password', function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{password:req.params.password},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

//review later
router.put('/editprofile/:sid/editpicture/:picture', function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{picture:req.params.picture},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

module.exports = router;