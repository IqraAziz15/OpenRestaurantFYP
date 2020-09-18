var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restaurant_adminSchema = new Schema({
    username: {
        type: String,
        required: true
    }, 

    password:{
        type:String
    },    
 
    restaurant: {    
            type:mongoose.Types.ObjectId,
            ref: 'Restaurant'
    }    
   
});

module.exports = mongoose.model('Restaurant_admin', restaurant_adminSchema)