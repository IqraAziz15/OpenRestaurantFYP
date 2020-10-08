var mongoose = require('mongoose');
var mongooseAutopopulate = require("mongoose-autopopulate")
var Schema = mongoose.Schema;
var subMenuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    items: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Item',
            autopopulate: true
        }
    ],
    deals: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Deal',
            autopopulate: true
        }
    ],

});
subMenuSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('SubMenu', subMenuSchema)