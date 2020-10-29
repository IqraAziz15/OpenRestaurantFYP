var Waiter = require('../../models/waiter');

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editUsernameInSetting = (function(req, res, next) {
    Waiter.findByIdAndUpdate({_id:req.params.rid},{username:req.body.username}).then(function() {
        Waiter.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Waiter);
        });
    });
});

exports.editEmailInSetting = (function(req, res, next) {
    Waiter.findByIdAndUpdate({_id:req.params.rid},{email:req.body.email}).then(function() {
        Waiter.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Waiter);
        });
    });
});

exports.editPhoneNumberInSetting = (function(req, res, next) {
    Waiter.findByIdAndUpdate({_id:req.params.rid},{phonenumber:req.body.phonenumber}).then(function() {
        Waiter.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Waiter);
        });
    });
});

exports.editPasswordInSetting = (function(req, res, next) {
    Waiter.findByIdAndUpdate({_id:req.params.rid},{password:req.body.password}).then(function() {
        Waiter.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Waiter);
        });
    });
});

