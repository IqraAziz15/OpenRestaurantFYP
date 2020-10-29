var Staff = require('../../models/staff');

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editUsernameInSetting = (function(req, res, next) {
    Staff.findByIdAndUpdate({_id:req.params.rid},{username:req.body.username}).then(function() {
        Staff.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Staff);
        });
    });
});

exports.editEmailInSetting = (function(req, res, next) {
    Staff.findByIdAndUpdate({_id:req.params.rid},{email:req.body.email}).then(function() {
        Staff.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Staff);
        });
    });
});

exports.editPhoneNumberInSetting = (function(req, res, next) {
    Staff.findByIdAndUpdate({_id:req.params.rid},{phonenumber:req.body.phonenumber}).then(function() {
        Staff.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Staff);
        });
    });
});

exports.editPasswordInSetting = (function(req, res, next) {
    Staff.findByIdAndUpdate({_id:req.params.rid},{password:req.body.password}).then(function() {
        Staff.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Staff);
        });
    });
});

