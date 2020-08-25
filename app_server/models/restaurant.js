var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    average_ratings: {
        type: Number,
    },
    rating_count: {
        type: Number,
    },
    reviews: [
        {
            review: {
                type: mongoose.Types.ObjectId,
                ref: 'Review'
            }
        }
    ],
    
    menu: {
        type: mongoose.Types.ObjectId,
        ref: 'Menu'
    },
    staff: [
        {
            restaurant_staff:{
                type: mongoose.Types.ObjectId,
                ref: 'Staff'
            },
            restaurant_waiter:{
                type: mongoose.Types.ObjectId,
                ref: 'Waiter'
            },
            
        }
    ]
       
    
});

module.exports = mongoose.model('Restaurant', restaurantSchema)