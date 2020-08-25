var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    items: [
        {
            item: {
                type: mongoose.Types.ObjectId,
                ref: 'Item'
            }
        }
    ],
    deals: [
        {
            deal: {
                type: mongoose.Types.ObjectId,
                ref: 'Deal'
            }
        }
    ],

});

module.exports = mongoose.model('Menu', menuSchema)