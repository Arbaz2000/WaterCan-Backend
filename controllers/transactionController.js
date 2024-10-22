const Transaction = require("../models/transaction");
const Customer = require("../models/customer");
const Driver = require("../models/driver");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Create
exports.createTransaction = async (req, res) => {
  try {
    const { customerId, combo, driverId, paymentTaken, dueAmount, dateTime } =
      req.body;
    if (!driverId) {
      return res.status(400).json({ error: "Driver ID is required" });
    }
    const driver = await Driver.findById(driverId);
    const driverName = driver.name;
    const userId = req.params.userId;

    if (!customerId || !dateTime || !combo || !paymentTaken) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const customerName = customer.name;
    // Create a new route
    let bottlesCount = customer.bottlesLeft;
    let emailMessage = `Hi ${customer.name},here is your receipt\nTransaction Details:\n\n`;
    await combo.forEach((item) => {
      emailMessage += `Type: ${item.type}\n`;
      emailMessage += `Bottles Delivered: ${item.bottlesDelivered}\n`;
      emailMessage += `Bottles Received: ${item.bottlesReceived}\n\n`;
      bottlesCount += item.bottlesDelivered - item.bottlesReceived;
    });
    await Customer.findOneAndUpdate(
      { _id: customerId },
      { $set: { txnDate: dateTime } }
    );

    await Customer.findByIdAndUpdate(customerId, { bottlesLeft: bottlesCount });
    const transaction = new Transaction({
      userId,
      customerId,
      combo,
      driverId,
      paymentTaken,
      dueAmount,
      dateTime,
      driverName,
      customerName,
      bottlesCount,
    });
    await transaction.save();
    // Compose email message
    emailMessage += `Payments: ${paymentTaken}₹\n`;
    emailMessage += `Due Amount: ${dueAmount}₹\n`;
    emailMessage += `Transaction Date: ${dateTime}\n`;
    emailMessage += `Delivered by: ${driverId}\n`; // Fixed the curly brace typo
    await (async () => {
      // Simulate an asynchronous operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await sendEmail(customer.email, "Transaction Details", emailMessage);
      // Send email to customer
    })();
    // Return the created transaction
    res.status(201).json({
      success: true,
      message: "transaction created successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Error creating transaction" });
  }
};

exports.transactionHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Fetch all transaction from the database
    const transactions = await Transaction.find({ userId });
    console.log("Transactions :", userId, transactions);
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Error fetching Transaction:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

async function sendEmail(to, subject, text) {
  try {
    // Create Nodemailer transporter
    let transporter = nodemailer.createTransport({
      // Configure SMTP transporter
      host: "smtp.gmail.com", // SMTP server host (e.g., smtp.gmail.com)
      port: 587, // SMTP server port (587 for TLS, 465 for SSL)
      secure: false, // true for 465, false for other ports
      auth: {
        user: "sampming1@gmail.com", // SMTP username
        pass: "wbta gpcc cgsh dzvl", // SMTP password
      },
    });

    // Define email options
    let mailOptions = {
      from: "sampming1@gmail.com", // Sender email address
      to: to, // Recipient email address
      subject: subject, // Email subject
      text: text, // Email body
    };
    // console.log("send ", mailOptions);
    // return;
    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Throw the error to handle it in the calling function
  }
}

exports.customerTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const customerId = req.params.customerId;
    // Fetch all transaction from the database
    const transactions = await Transaction.find({ userId, customerId });
    // console.log("Transactions :",userId,transactions)
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error("Error fetching Transaction:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
};
