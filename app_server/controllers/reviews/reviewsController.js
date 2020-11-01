var express = require('express');
var router = express.Router();
var Review = require('../../models/review');


/* post reviews */
exports.addReview = ( function(req, res, next) {
    Review.create(req.body)
            .then((review) => {
            console.log('Review done', review);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(review);
        }, (err) => next(err))
        .catch((err) => next(err));;

});

/* update reviews */
exports.changeReview = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{description:req.body.description}),function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(results);

}});


/* remove reviews */
exports.removeReview = ( function(req, res, next) {
    Review.deleteOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    })});


/* get reviews */
exports.getReviews = ( function(req, res, next) {
    Review.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    })});


/* get  review */
exports.getReview = ( function(req, res, next) {
    Review.findOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
})});

/* get  all review of a customer */
exports.getReviewsCustomer = ( function(req, res, next) {
    Review.find({ customer: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
  })});

/* thumbsup */
exports.thumbsUp = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{ $inc: { thumbsup: 1 }}),function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(results);
   }});


/* remove thumbsup */
exports.decThumbsUp = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{ $inc: { thumbsup: -1 }}),function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(results);
}});


/* thumbsdown */
exports.thumbsDown = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{ $inc: { thumbsdown: 1 }}),function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(results);
}});

/* remove thumbsdown */
exports.decThumbsDown = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{ $inc: { thumbsdown: -1 }}),function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(results);
}});
