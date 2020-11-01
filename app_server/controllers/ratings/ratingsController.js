var express = require('express');
var router = express.Router();
var Rating = require('../../models/rating');


/* post ratings */
exports.rate = ( function(req, res, next) {
    Rating.create(req.body)
            .then((rating) => {
            console.log('Rating done', rating);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(rating);
        }, (err) => next(err))
        .catch((err) => next(err));;

});

/* update ratings */
exports.changeRating = ( function(req, res, next) {
    Rating.findOneAndUpdate({_id:req.body._id},{stars:req.body.stars}),function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(results);
      }});


/* remove ratings */
exports.removeRating = ( function(req, res, next) {
    Rating.deleteOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    })});


/* get ratings */
exports.getRatings = ( function(req, res, next) {
    Rating.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});


/* get  rating */
exports.getRating = ( function(req, res, next) {
    Rating.findOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get  all rating of a customer */
exports.getRatingsCustomer = ( function(req, res, next) {
    Rating.find({ customer: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});



