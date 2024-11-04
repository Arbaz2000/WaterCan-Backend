const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  combo: [
    {
      type: {
        type: String,
        required: true,
      },
      bottlesReceived: {
        type: Number,
        default: 0,
      },
      bottlesDelivered: {
        type: Number,
        default: 0,
      },
    },
  ],
  bottlesCount: {
    type: Number,
    default: 0,
  },
  paymentTaken: {
    type: Number,
    default: null,
  },
  dueAmount: {
    type: Number,
    default: 0,
  },
  dateTime: {
    type: String,
    default: null,
  },
  driverName: {
    type: String,
    required: true,
  },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
