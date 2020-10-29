var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cartSchema = new Schema({
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
   
});

module.exports = mongoose.model('Cart', cartSchema)