var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var Restaurant = require('../models/restaurant');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////



/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewrestaurants', function(req, res, next) {
    Restaurant.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/finditem', function(req, res, next) {
    Item.find({name:req.params.name}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/findrestaurant', function(req, res, next) {
    Restaurant.find({name:req.params.name}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////



/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////











module.exports = router;
