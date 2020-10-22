var RestaurantAdmin = require('../../models/restaurant_admin');

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editUsernameInSetting = (function(req, res, next) {
    RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},req.body.username).then(function() {
        RestaurantAdmin.findOne({_id:req.params.rid}).then(function(Deal){
            res.send(RestaurantAdmin);
        });
    });
});

