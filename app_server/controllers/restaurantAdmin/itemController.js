var multer = require('multer');
var Item = require('../../models/item')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addItem = (upload.single('image'), (req, res) => {
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

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewItem = (function(req, res, next) {
    Item.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeItem = (function(req, res, next) {
    Item.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editItem = (function(req, res, next) {
    Item.findByIdAndUpdate({_id:req.params.eid}, req.body).then(function() {
        Item.findOne({_id:req.params.eid}).then(function(Item){
             res.send(Item);
         });
    });
});

