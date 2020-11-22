var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    // customer_id: {
    //     type: String,
    //     required: true
    // },

    cart: {
        type: Array,
        default: []
    }
   
});

module.exports = mongoose.model('Customer', customerSchema)