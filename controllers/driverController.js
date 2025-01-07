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
  try {
    console.log("Verify:", req.body);
    const { email, password, mobileNo } = req.body;

    // Check if either email/password or mobileNo is provided
    if (!email && !mobileNo) {
      return res.status(400).json({ error: 'Email or mobile number is required' });
    }

    // Try to find the driver based on email or mobileNo
    let driver;
    if (email) {
      // Find the driver by email
      driver = await Driver.findOne({ email }).select('+password +mobileNo');
    } else if (mobileNo) {
      // Find the driver by mobile number
      driver = await Driver.findOne({ mobileNo }).select('+password +email');
    }

    // If driver not found, return error
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // If both email and password are provided, validate them
    if (email && password) {
      const passwordMatch = await bcrypt.compare(password, driver.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
    }

    // If mobileNo is provided, validate it
    if (mobileNo && driver.mobileNo !== mobileNo) {
      return res.status(401).json({ error: 'Invalid mobile number' });
    }

    // If login is successful, return the driver details
    res.status(200).json({ success: true, message: 'Login successful', driver });
  } catch (error) {
    console.error('Error verifying driver credentials:', error);
    res.status(500).json({ error: 'Error verifying driver credentials' });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    console.log("hello testing")
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error getting customers:', error);
    res.status(500).json({ error: 'Error getting customers' });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    if (!driverId) {
      return res.status(400).json({ error: 'Driver ID is required' });
    }

    // Find the customer
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    // TODO: DO IT LATOR
    // // Find the route associated with the customer
    // const routeId = customer.route;
    // const route = await Route.findById(routeId);
    // if (!route) {
    //   return res.status(404).json({ error: 'Route not found for the customer' });
    // }

    // // Remove the customer's ID from the route's customers array
    // route.customers.pull(customerId);
    // await route.save();

    // Delete the customer from the database
    await Driver.findByIdAndDelete(driverId);

    console.log('Driver deleted successfully');
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting Driver:', error);
    res.status(500).json({ error: 'Error deleting Driver' });
  }
};