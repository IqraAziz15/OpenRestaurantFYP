var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('config');
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var waiterRouter = require('./app_server/routes/waiter');
var userRouter = require('./app_server/routes/user');
var restaurantAdminRouter = require('./app_server/routes/restaurant_admin');
var superAdminRouter = require('./app_server/routes/super_admin');

var app = express();

//DB config
const dB = config.get('mongoURI');

const connection = mongoose.connect(dB, { useNewUrlParser: true, useUnifiedTopology: true });
var app = express();
connection.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
//bodyparser middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/waiter', waiterRouter);
app.use('/user', userRouter);
app.use('/restaurantadmin', restaurantAdminRouter);
app.use('/super_admin', superAdminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('react-frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
