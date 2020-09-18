var express = require('express');
var router = express.Router();
var Restaurant_admin=require('../models/restaurant_admin');
var Restaurant=require('../models/restaurant');
// const super_admin = require('../models/super_admin');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addrestaurant', function(req, res, next) {
    Restaurant.create(req.body).then((restaurant)=>{
        console.log('restaurant has been added', restaurant);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(restaurant);
      }, (err) => next(err)).catch((err)=>next(err));
  });

router.post('/addadminrestaurant', function(req, res, next) {
    Restaurant_admin.create(req.body).then((restaurant_admin)=>{
        console.log('restaurant admin has been added', restaurant_admin);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(restaurant_admin);
    }, (err) => next(err)).catch((err)=>next(err));
});

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/adminrestaurant/:id', function(req, res, next) {
    Restaurant_admin.findById(req.params.id)
        .then((restaurant_admin) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant_admin);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.get('/adminrestaurants', function(req, res, next) {
    Restaurant_admin.find().sort('username').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/restaurants', function(req, res, next) {
    Restaurant.find({}).populate('restaurant_admin').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/restaurant/:id', function(req, res, next) {
    Restaurant.findById(req.params.id)
        .then((restaurant) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant);
        }, (err) => next(err))
        .catch((err) => next(err));

});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/deladminrestaurant/:id', function(req, res, next) {
    Restaurant_admin.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid datas
        res.json(results);
    });
});

router.delete('/delrestaurant/:id', function (req, res, next) {
    Restaurant.deleteOne({ _id: req.params.id }, function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/restaurant/:rid/restaurantadmin/:raid', function(req, res, next) {
    Restaurant.findOneAndUpdate({ _id: req.params.rid }, { restaurant_admin: req.params.raid }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

   /*  router.put('/editres/:rid', function(req, res, next) { 
    Restaurant.findOneAndUpdate({_id:req.params.rid},{name:req.params.name},function(error, results) {
        if (error) {
        return next(error);
        }
        // Respond with valid data
        res.json(results);
        });
        });
     */

router.put('/editres/:rid', function(req, res, next) {
    Restaurant.findByIdAndUpdate({_id:req.params.rid}, req.body).then(function() {
        Restaurant.findOne({_id:req.params.rid}).then(function(Restaurant){
            res.send(Restaurant);
        });
    });
}); 

router.put('/changeresadmin/:raid', function(req, res, next) {
    Restaurant_admin.findByIdAndUpdate({_id:req.params.raid}, req.body).then(function() {
        Restaurant_admin.findOne({_id:req.params.raid}).then(function(Restaurant_admin){
            res.send(Restaurant_admin);
        });
    });
});

module.exports = router; 