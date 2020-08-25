var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewSchema = new Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
    },
    description: {
        type: String,
        required: true 
    },
    thumbsup: {
        type: Number,
        required: true 
    },
    thumbsdown: {
        type: Number,
        required: true 
    },
});

module.exports = mongoose.model('Review', reviewSchema)