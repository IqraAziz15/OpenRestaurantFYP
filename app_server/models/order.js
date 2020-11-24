var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    orderid:{
        type: String,
        required:true
    },
    // name: {
    //     type: String,
    //     required: true
    // },
    giftcoupon: {
        type: String,
    },
    customer_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    ordered_food : {
        type: Array,
        required: true
    },
    total_bill: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
    },
    ordertime: {
        type: Date,
        default: Date.now()
    },
    status:{
        type:String,
        default: "Pending"
    },
    payment_method: {
        type: String,
    }
});

module.exports = mongoose.model('Order', orderSchema)