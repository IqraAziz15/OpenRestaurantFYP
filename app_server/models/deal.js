var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dealSchema = new Schema({
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

    description: {
        type: String,
    },

    total_bill: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Deal', dealSchema)