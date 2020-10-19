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
var waiterRouter = require('./app_server/routes/waiter/waiter');
var waiterRestaurantRouter = require('./app_server/routes/waiter/restaurant');
var waiterOrderRouter = require('./app_server/routes/waiter/order');
var staffRouter = require('./app_server/routes/staff/staff');
var staffRestaurantRouter = require('./app_server/routes/staff/restaurant');
var staffOrderRouter = require('./app_server/routes/staff/order');
var userWaiterRouter = require('./app_server/routes/userprofile/waiter');
var userStaffRouter = require('./app_server/routes/userprofile/staff');
var userrestaurantAdminRouter = require('./app_server/routes/userprofile/restaurantAdmin');
var restaurantAdminDealRouter = require('./app_server/routes/restaurantAdmin/deal');
var restaurantAdminItemRouter = require('./app_server/routes/restaurantAdmin/item');
var restaurantAdminMenuRouter = require('./app_server/routes/restaurantAdmin/menu');
var restaurantAdminStaffRouter = require('./app_server/routes/restaurantAdmin/staff');
var restaurantAdminSubmenuRouter = require('./app_server/routes/restaurantAdmin/submenu');
var restaurantAdminWaiterRouter = require('./app_server/routes/restaurantAdmin/waiter');
var restaurantAdminRestaurantRouter = require('./app_server/routes/restaurantAdmin/restaurant');
var superAdminRestaurantRouter = require('./app_server/routes/superadmin/restaurant');
var superAdminRestaurantAdminRouter = require('./app_server/routes/superadmin/restaurantAdmin');
var customerItemRouter = require('./app_server/routes/customer/item')
var customerRestaurantRouter = require('./app_server/routes/customer/restaurant')

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
app.use('/waiter/restaurant', waiterRestaurantRouter);
app.use('/waiter/order', waiterOrderRouter);
app.use('/staff', staffRouter);
app.use('/staff/restaurant', staffRestaurantRouter);
app.use('/staff/order', staffOrderRouter);
app.use('/userprofile/waiter', userWaiterRouter);
app.use('/userprofile/staff', userStaffRouter);
app.use('/userprofile/restaurantAdmin', userrestaurantAdminRouter);
app.use('/restaurantadmin/deal', restaurantAdminDealRouter);
app.use('/restaurantadmin/item', restaurantAdminItemRouter);
app.use('/restaurantadmin/menu', restaurantAdminMenuRouter);
app.use('/restaurantadmin/staff', restaurantAdminStaffRouter);
app.use('/restaurantadmin/submenu', restaurantAdminSubmenuRouter);
app.use('/restaurantadmin/waiter', restaurantAdminWaiterRouter);
app.use('/restaurantadmin/restaurant', restaurantAdminRestaurantRouter);
app.use('/superadmin/restaurant', superAdminRestaurantRouter);
app.use('/superadmin/restaurantadmin', superAdminRestaurantAdminRouter);
app.use('/customer/item', customerItemRouter);
app.use('/customer/restaurant', customerRestaurantRouter);


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
