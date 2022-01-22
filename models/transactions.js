const mongoose = require("mongoose");

const constants = require("../tools/constants");

const TransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    match: constants.transactionIdValidationRegex,
  },
  userEmail: {
    type: String,
    required: true,
    match: constants.emailValidationRegex,
  },
  customerId: {
    type: String,
    required: true,
    match: constants.customerIdValidationRegex,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
    maxlength: 2000,
  },
});

const Transaction = mongoose.model("transactions", TransactionSchema);

module.exports = Transaction;
