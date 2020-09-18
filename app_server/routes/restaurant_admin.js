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
var Staff = require('../models/staff');
var Waiter = require('../models/waiter');

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

// router.post('/adddeal', function(req, res, next) {
//     Deal.create(req.body)
//             .then((deal) => {
//             console.log('Deal has been Added ', deal);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(deal);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });

router.post('/adddeal', upload.single('image'), (req, res) => {
    console.log(req.file);
    // console.log(req.file.filename);
    // var paths = 'http://localhost:4000/uploads/' + req.file.filename;
    // console.log(paths);
    
    var d = new Deal;
    d.name = req.body.name;
    d.description = req.body.description;
    d.total_bill = req.body.total_bill;
    d.image = 'http://localhost:4000/uploads/' + req.file.filename;
    d.save((err, result) => {
        console.log(result)
        if (err) {
            console.log(`upload.single error: ${err}`);
            return console.log(err)
        }
        console.log('saved to database')
        res.send(d);
    })
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

router.post('/addstaff', function(req, res, next) {
    Staff.create(req.body).then((staff)=>{
        console.log('staff has been added', staff);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(staff);
      }, (err) => next(err)).catch((err)=>next(err));
});

router.post('/addwaiter', function(req, res, next) {
    Waiter.create(req.body).then((waiter)=>{
        console.log('waiter has been added', waiter);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(waiter);
      }, (err) => next(err)).catch((err)=>next(err));
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

router.get('/viewdeal', function(req, res, next) {
    Deal.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/viewstaff', function(req, res, next) {
    Staff.find().sort('username').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.get('/viewwaiter', function(req, res, next) {
    Waiter.find().sort('username').exec(function(error, results) {
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

router.delete('/removestaff/:id', function(req, res, next) {
    Staff.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

router.delete('/removewaiter/:id', function(req, res, next) {
    Waiter.deleteOne({ _id: req.params.id }, function(error, results) {
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

router.put('/editdeal/:did', function(req, res, next) {
    Deal.findByIdAndUpdate({_id:req.params.did}, req.body).then(function() {
        Deal.findOne({_id:req.params.did}).then(function(Item){
             res.send(Item);
         });
    });
}); 

// router.put('/editdeal', function(req, res, next) {
//     Deal.findOneAndUpdate({_id:req.body._id},{item:req.body.item,description:req.body.description,total_bill:req.body.total_bill},function(error, results) {
//     if (error) {
//     return next(error);
//     }
//     // Respond with valid data
//     res.json(results);
//     });
// });


module.exports = router;