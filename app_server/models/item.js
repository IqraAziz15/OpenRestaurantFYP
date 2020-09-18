var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        // data: Buffer,
        // contentType: String
        type: String
    },
    description: {
        type: String,
         
    },
    ratings: [
        {
            rating_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Rating'
            }
        }
    ],
    reviews: [
        {
            review_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Review'
            }
        }
    ],

});

module.exports = mongoose.model('Item', itemSchema)