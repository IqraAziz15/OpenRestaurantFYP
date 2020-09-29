var multer = require('multer');
var Deal = require('../../models/deal')

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

exports.addDeal = (upload.single('image'), (req, res) => {
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

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewDeal = (function(req, res, next) {
    Deal.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeDeal = (function(req, res, next) {
    Deal.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editDeal = (function(req, res, next) {
    Deal.findByIdAndUpdate({_id:req.params.did}, req.body).then(function() {
        Deal.findOne({_id:req.params.did}).then(function(Item){
             res.send(Item);
         });
    });
});

