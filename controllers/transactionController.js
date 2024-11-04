const Transaction = require("../models/transaction"); // Adjust the path as necessary
const Report = require("../models/report"); // Adjust the path as necessary

const createTransaction = async (req, res) => {
  const { combo, paymentTaken, dueAmount, dateTime, driverName, customerName } =
    req.body;

  try {
    // Create the transaction without userId and customerId
    const transaction = await Transaction.create({
      combo,
      paymentTaken,
      dueAmount,
      dateTime,
      driverName,
      customerName,
    });

    // Create the report entry
    const report = new Report({
      _id: transaction._id.toString(), // Use the same ID as the transaction
      customerName,
      combo,
      bottlesCount: combo.reduce(
        (total, item) => total + item.bottlesReceived,
        0
      ), // Sum bottlesReceived
      paymentTaken,
      dueAmount,
      dateTime,
      driverName,
    });

    // Save the report
    await report.save();

    res.status(201).json({ transaction, report });
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

module.exports = {
  createTransaction,
};
