var express = require('express');
var router = express.Router();
var Transaction = require('../../models/transaction_details');


/* post Transactions */
exports.saveTransaction = ( function(req, res, next) {
    Transaction.create(req.body)
            .then((Transaction) => {
            console.log('Transaction saved successfully.', Transaction);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Transaction);
        }, (err) => next(err))
        .catch((err) => next(err));;

});


/* remove Transactions */
exports.removeTransaction = ( function(req, res, next) {
    Transaction.deleteOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    })});


/* get All Transactions */
exports.getAllTransactions = ( function(req, res, next) {
    Transaction.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});


/* get  Transaction */
exports.getTransaction = ( function(req, res, next) {
    Transaction.findOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get  all Transaction of a customer */
exports.getTransactionsCustomer = ( function(req, res, next) {
    Transaction.find({ customer: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get  all Transaction of a restaurant */
exports.getTransactionsRestaurant = ( function(req, res, next) {
    Transaction.find({ rest_id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});
