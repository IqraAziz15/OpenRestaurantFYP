var config = require('config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Waiter = require('../../models/waiter')
const JWT_SECRET = config.get('jwtSecret');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////      WAITER USERPROFILE      ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   POST routes/userprofile/waiter/loginwaiter
 * @desc    Login user
 * @access  Public
 */

exports.waiterLogin = (async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await Waiter.findOne({ email });
      if (!user) throw Error('Waiter Does not exist');
  
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
 * @route   POST routes/userprofile/waiter/registerwaiter
 * @desc    Register new user
 * @access  Public
 */

exports.waiterRegister = (async (req, res) => {
    const { name, username, email, phonenumber, password } = req.body;
  
    // Simple validation
    if (!name || !username || !email || !phonenumber || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user= await Waiter.findOne({ email });
      if (user) throw Error('Waiter already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
  
      const newWaiter = new Waiter({
        name,
        username,
        email,
        phonenumber,
        password: hash
      });
  
      const savedWaiter = await newWaiter.save();
      if (!savedWaiter) throw Error('Something went wrong saving the user');
  
      const token = jwt.sign({ id: savedWaiter._id }, JWT_SECRET, {
          expiresIn: 3600
        });  
  
      res.status(200).json({
          token,
          user: {
          id: savedWaiter.id,
          name: savedWaiter.name,
          username : savedWaiter.username,
          email: savedWaiter.email,
          phonenumber: savedWaiter.phonenumber
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
});

/**
 * @route   GET userprofile/waiter/waiter
 * @desc    Get user data
 * @access  Private
 */

exports.waiterProfile = (async (req, res) => {
    try{
        Waiter.findById(req.user.id)
        .select('-password')
        .then(user => res.json({
          id: user._id,
          name: user.name,
          username : user.username,
          email: user.email,
          phonenumber: user.phonenumber
        }));
    }
    catch (e) {
        res.status(400).json({ error: e.message });
      }
});