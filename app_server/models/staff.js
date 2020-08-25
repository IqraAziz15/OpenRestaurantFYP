var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var staffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: Buffer,
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    orders: [
        {
            order: {
                type: mongoose.Types.ObjectId,
                ref: 'Order'
            }
        }
    ], 
});

module.exports = mongoose.model('Staff', staffSchema)