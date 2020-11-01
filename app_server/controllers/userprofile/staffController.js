var config = require('config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Staff = require('../../models/staff')
const JWT_SECRET = config.get('jwtSecret');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////      STAFF USERPROFILE      ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @route   POST routes/userprofile/staff/loginstaff
 * @desc    Login user
 * @access  Public
 */

exports.staffLogin = (async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await Staff.findOne({ email });
      if (!user) throw Error('Staff Does not exist');
  
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
 * @route   POST routes/userprofile/staff/registerstaff
 * @desc    Register new user
 * @access  Public
 */

exports.staffRegister = (async (req, res) => {
    const { name, username, email, phonenumber, password } = req.body;
  
    // Simple validation
    if (!name || !username || !email || !phonenumber || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user= await Staff.findOne({ email });
      if (user) throw Error('Staff already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');
  
      const newStaff = new Staff({
        name,
        username,
        email,
        phonenumber,
        password: hash
      });
  
      const savedStaff = await newStaff.save();
      if (!savedStaff) throw Error('Something went wrong saving the user');
  
      const token = jwt.sign({ id: savedStaff._id }, JWT_SECRET, {
          expiresIn: 3600
        });  
  
      res.status(200).json({
          token,
          user: {
          id: savedStaff.id,
          name: savedStaff.name,
          username : savedStaff.username,
          email: savedStaff.email,
          phonenumber: savedStaff.phonenumber
        }
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
});

/**
 * @route   GET userprofile/staff/staff
 * @desc    Get user data
 * @access  Private
 */

exports.staffProfile = async (req, res) => {
    try{
      Staff.findById(req.user.id)
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
};