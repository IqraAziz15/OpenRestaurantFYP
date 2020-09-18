var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dealSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    // items: [
    //     {
    //         item: {
    //             type: mongoose.Types.ObjectId,
    //             ref: 'Item'
    //         },
    //         quantity: {
    //             type: Number,
    //         },
    //     }
    // ],

    description: {
        type: String,
    },

    total_bill: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Deal', dealSchema)