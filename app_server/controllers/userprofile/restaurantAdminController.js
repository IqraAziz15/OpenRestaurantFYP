var config = require('config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var auth = require('../../../middleware/auth');
var Restaurantadmin = require('../../models/restaurant_admin')
const JWT_SECRET = config.get('jwtSecret');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////      RESTAURANT ADMIN USERPROFILE      /////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   POST routes/userprofile/restaurantadmin/loginrestaurantadmin
 * @desc    Login user
 * @access  Public
 */

exports.restaurantAdminLogin = (async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await Restaurantadmin.findOne({ email });
      if (!user) throw Error('Restaurant Admin Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
          token,
          user: {
          id: user._id,
          email: user.email
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
});

/**
 * @route   POST routes/userprofile/restaurantadmin/registerrestaurantadmin
 * @desc    Register new user
 * @access  Public
 */

exports.restaurantAdminRegister = (async (req, res) => {
    const { name, username, email, phonenumber, password } = req.body;
  
    // Simple validation
    if (!name || !username || !email || !phonenumber || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user= await Restaurantadmin.findOne({ email });
      if (user) throw Error('Restaurant Admin already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
  
      const newRestaurantAdmin = new Restaurantadmin({
        name,
        username,
        email,
        phonenumber,
        password: hash
      });
  
      const savedRestaurantAdmin = await newRestaurantAdmin.save();
      if (!savedRestaurantAdmin) throw Error('Something went wrong saving the user');
  
      const token = jwt.sign({ id: savedRestaurantAdmin._id }, JWT_SECRET, {
          expiresIn: 3600
        });  
  
      res.status(200).json({
          token,
          user: {
          id: savedRestaurantAdmin.id,
          name: savedRestaurantAdmin.name,
          username : savedRestaurantAdmin.username,
          email: savedRestaurantAdmin.email,
          phonenumber: savedRestaurantAdmin.phonenumber
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
});

/**
 * @route   GET userprofile/restaurantadmin/restaurantadmin
 * @desc    Get user data
 * @access  Private
 */

exports.restaurantAdminProfile = (auth, async (req, res) => {
    try{
        Restaurantadmin.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
});

