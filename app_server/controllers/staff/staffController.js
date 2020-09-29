var Staff = require('../../models/staff')
  
/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewStaffProfile = (function(req, res, next){
    console.log(req.params.id);
    Staff.findById(req.params.id)
        .then((staff) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(staff);
        }, (err) => next(err))
        .catch((err) => next(err));
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editNameInSetting = (function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{name:req.params.name},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editUsernameInSetting = (function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{username:req.params.username},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editEmailInSetting = (function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{email:params.body.email},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editPhonenumberInSetting = (function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{phonenumber:req.params.phonenumber},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editPasswordInSetting = ( function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{password:req.params.password},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editPictureInSetting = (function(req, res, next) {
    Staff.findOneAndUpdate({_id:req.params.sid},{picture:req.params.picture},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});
