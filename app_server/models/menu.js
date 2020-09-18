var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var menuSchema = new Schema({
    submenus: [
        {
            submenu: {
                type: mongoose.Types.ObjectId,
                ref: 'SubMenu'
            }
        }
    ],

});

module.exports = mongoose.model('Menu', menuSchema)