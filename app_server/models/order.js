var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    items: [
        {
            item: {
                type: mongoose.Types.ObjectId,
                ref: 'Item'
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ],
    deals: [
        {
            deal: {
                type: mongoose.Types.ObjectId,
                ref: 'Deal'
            },
            quantity: {
                type: Number,
                required: true
            },
        }
    ], 
    total_bill: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
    },
    payment_method: {
        type: String,
    }
});

module.exports = mongoose.model('Order', orderSchema)