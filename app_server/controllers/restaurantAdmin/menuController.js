var Menu = require('../../models/menu')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addMenu = (function(req, res, next) {
    Menu.create(req.body)
            .then((menu) => {
            console.log('Menu has been Added ', menu);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(menu);
        }, (err) => next(err))
        .catch((err) => next(err));
});

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewMenu = (function(req, res, next) {
    Menu.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
