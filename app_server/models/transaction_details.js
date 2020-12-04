var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TransactionSchema = new Schema({
    transactionid:{
        type: String,
        required:true
    },
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    rest_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    transactiontime: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.model('Transaction', TransactionSchema)