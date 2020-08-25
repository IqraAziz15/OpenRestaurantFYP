var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');
var multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//       cb(null, new Date().toISOString() + file.originalname);
//     }
//   });


var Item = require('../models/item');
var Deal = require('../models/deal');
var Menu = require('../models/menu');

// router.use(express.static(__dirname+'../uploads/'))

// var setpermission = function(req,res,next)
// {  
    
//     res.setHeader('Access-Control-Allow-Methods', '*')
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', '*')        
//     res.setHeader('Access-Control-Allow-Credentials', true);  
//     next();    
// }

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

// router.post('/additem', function(req, res, next) {
//     Item.create(req.body)
//             .then((item) => {
//             console.log('Item has been Added ', item);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(item);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });


// router.post('/additem', upload.single('picture'), (req, res) => {
//     var i = new Item;
//     i.name = req.body.name;
//     i.price = req.body.price;
//     i.description = req.body.description;
//     i.image.data = fs.readFileSync(req.file.path);
//     i.image.contentType = 'image/png';
//     i.save((err, result) => {
//         console.log(result)

//         if (err) return console.log(err)
//         console.log('saved to database')
//         res.send(i);
//     })
// });


// router.post('/additem', upload.single('image'), (req, res) => {
//     console.log(req.file);
//     // console.log(req.file.filename);
//     var i = new Item;
//     i.name = req.body.name;
//     i.price = req.body.price;
//     i.description = req.body.description;
//     i.image = req.file.path;
//     i.save((err, result) => {
//         console.log(result)

//         if (err) return console.log(err)
//         console.log('saved to database')
//         res.send(i);
//     })
// });
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });
router.post('/additem', upload.single('image'), (req, res) => {
    console.log(req.file);
    // console.log(req.file.filename);
    // var paths = 'http://localhost:4000/uploads/' + req.file.filename;
    // console.log(paths);
    
    var i = new Item;
    i.name = req.body.name;
    i.price = req.body.price;
    i.description = req.body.description;
    i.image = 'http://localhost:4000/uploads/' + req.file.filename;
    i.save((err, result) => {
        console.log(result)

        if (err) {
            console.log(`upload.single error: ${err}`);
            return console.log(err)
        }
        console.log('saved to database')
        res.send(i);
    })
});



// router.post('/additem', function(req, res, next) {
//     i = new Item();
//     i.name = req.body.item_name;
//     i.price = req.body.item_price;
//     i.description = req.body.item_description;
//     i.save(function(error, results) {
//     if (error) {
//     return next(error);
//     }
//     // Respond with valid data
//     res.json(results);
//     });
// });

router.post('/adddeal', function(req, res, next) {
    Deal.create(req.body)
            .then((deal) => {
            console.log('Deal has been Added ', deal);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(deal);
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.post('/addmenu', function(req, res, next) {
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

router.get('/menu', function(req, res, next) {
    Menu.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/viewitem', function(req, res, next) {
    Item.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/deal', function(req, res, next) {
    Deal.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/removeitem/:id', function(req, res, next) {
    Item.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.delete('/removedeal/:id', function(req, res, next) {
    Deal.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

// router.put('/edititem', function(req, res, next) {
//     Item.findOneAndUpdate({_id:req.body._id},{price:req.body.price,description:req.body.description},function(error, results) {
//     if (error) {
//     return next(error);
//     }
//     // Respond with valid data
//     res.json(results);
//     });
// });

router.put('/edititem/:eid', function(req, res, next) {
    Item.findByIdAndUpdate({_id:req.params.eid}, req.body).then(function() {
        Item.findOne({_id:req.params.eid}).then(function(Item){
             res.send(Item);
         });
    });
}); 

router.put('/editdeal', function(req, res, next) {
    Deal.findOneAndUpdate({_id:req.body._id},{item:req.body.item,description:req.body.description,total_bill:req.body.total_bill},function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(results);
    });
});


module.exports = router;