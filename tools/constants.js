// Credits: https://stackoverflow.com/a/21456918/17538574
const passwordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

// Credits: https://stackoverflow.com/a/8829363/17538574
const emailValidationRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

// Only Indian numbers consisting of 10 digits
const mobileValidationRegex = /^\+91[1-9]{1}\d{9}$/;

// The size of the name should be between 1 and 500
const nameValidationRegex = /^.{1,500}$/;

// The size of the name should be between 1 and 300
const businessNameValidationRegex = /^.{1,300}$/;

const userIdValidationRegex = /USER[0-9]{7}/;

const customerIdValidationRegex = /CUS[0-9]{10}/;

const transactionIdValidationRegex = /TRAN[0-9]{13}/;

module.exports = {
  passwordValidationRegex,
  emailValidationRegex,
  mobileValidationRegex,
  nameValidationRegex,
  businessNameValidationRegex,
  userIdValidationRegex,
  customerIdValidationRegex,
  transactionIdValidationRegex,
};
