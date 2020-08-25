var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var complainSchema = new Schema({
    complain_id: {
        type: String,
        required: true
    }, 
    complain: { 
        type: String,
        reuqired: true
    }
});

module.exports = mongoose.model('Complain', complainSchema)