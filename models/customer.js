const mongoose = require("mongoose");

const constants = require("../tools/constants");

const CustomerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
    match: constants.customerIdValidationRegex,
  },
  userEmail: {
    type: String,
    required: true,
    match: constants.emailValidationRegex,
  },
  name: {
    type: String,
    required: true,
    match: constants.nameValidationRegex,
  },
  mobile: {
    type: String,
    required: false,
    match: constants.mobileValidationRegex,
  },
});

const Customer = mongoose.model("customers", CustomerSchema);

module.exports = Customer;
