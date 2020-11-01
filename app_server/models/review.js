var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewSchema = new Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    thumbsup: {
        type: Number,
        default:0
        // required: true 
    },
    thumbsdown: {
        type: Number,
        default:0
        // required: true 
    },

});

module.exports = mongoose.model('Review', reviewSchema)