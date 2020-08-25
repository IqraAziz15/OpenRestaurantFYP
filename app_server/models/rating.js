var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ratingSchema = new Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    stars: {
        type: Number,
        required: true ,
        min: 1,
        max: 5
    },
});

module.exports = mongoose.model('Rating', ratingSchema)