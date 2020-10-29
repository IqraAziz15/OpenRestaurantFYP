var RestaurantAdmin = require('../../models/restaurant_admin');

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editUsernameInSetting = (function(req, res, next) {
    RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},{username:req.body.username}).then(function() {
        RestaurantAdmin.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(RestaurantAdmin);
        });
    });
});

exports.editEmailInSetting = (function(req, res, next) {
    RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},{email:req.body.email}).then(function() {
        RestaurantAdmin.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(RestaurantAdmin);
        });
    });
});

exports.editPhoneNumberInSetting = (function(req, res, next) {
    RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},
        {
            phonenumber:req.body.phonenumber
        },{ new: true, upsert: false },
        function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
});

exports.editPasswordInSetting = (function(req, res, next) {
    RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},{password:req.body.password}).then(function() {
        RestaurantAdmin.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(RestaurantAdmin);
        });
    });
});

