const Driver = require('../models/driver');
const bcrypt = require('bcrypt');
// Create 
exports.createDriver = async (req, res) => {
  try {
    console.log("From frontend :",req.body)
    const { name, email, mobileNo, password, address } = req.body;
    if (!name || !email || !mobileNo || !password || !address) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const driver = new Driver({ name, email, mobileNo, password, address });
    await driver.save();
    console.log('Driver created:', driver);
    res.status(201).json({success:true, message: 'User created successfully', driver });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Read 
exports.getDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;
    if (!driverId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const driver = await Driver.findById(driverId);
    if (driver) {
      console.log('User found:', driver);
      res.status(200).json(driver);
    } else {
      console.log('User not found');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};


exports.verifyDriverCredentials = async (req, res) => {
  // console.log("HI",req.body.message)
  try {
    console.log("Verify :",req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user in the database by email
    const driver = await Driver.findOne({ email }).select('+password');
    // console.log("user :",user)
    // If user not found, return error
    if (!driver) {
      return res.status(404).json({ error: 'driver not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, driver.password);
    // console.log("passwordMatch",password.length," ",user.password.length)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If email and password are correct, generate a JWT token
    // const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Return success response with JWT token and user details
    res.status(200).json({ success: true, message: 'Login successful',  driver });
  } catch (error) {
    console.error('Error verifying driver credentials:', error);
    res.status(500).json({ error: 'Error verifying driver credentials' });
  }
};
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error getting customers:', error);
    res.status(500).json({ error: 'Error getting customers' });
  }
};