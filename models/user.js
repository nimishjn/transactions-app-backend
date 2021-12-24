const mongoose = require("mongoose");

const constants = require("../tools/constants");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    match: constants.userIdValidationRegex,
  },
  name: {
    type: String,
    required: true,
    match: constants.nameValidationRegex,
  },
  mobile: {
    type: String,
    required: true,
    match: constants.mobileValidationRegex,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: constants.emailValidationRegex,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  businessName: {
    type: String,
    required: true,
    match: constants.businessNameValidationRegex,
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
