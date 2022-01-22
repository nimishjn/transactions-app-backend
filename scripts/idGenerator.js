function idGenerator(prefix, length) {
  let result = prefix;
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function userIdGenerator() {
  const User = require("../models/user");

  let idExists = true;
  let attempts = 0;

  while (idExists && attempts <= 20) {
    attempts += 1;
    const newUserId = idGenerator("USER", 7);
    const response = await User.find({
      userId: newUserId
    });
    if (response.length === 0) {
      idExists = false;
      return newUserId;
    }
  }

  return null;
}

async function customerIdGenerator() {
  const Customer = require("../models/customer");

  let idExists = true;
  let attempts = 0;

  while (idExists && attempts <= 20) {
    attempts += 1;
    const newCustomerId = idGenerator("CUS", 10);
    const response = await Customer.find({
      customerId: newCustomerId
    });
    if (response.length === 0) {
      idExists = false;
      return newCustomerId;
    }
  }

  return null;
}

async function transactionIdGenerator() {
  const Transactions = require("../models/transactions");

  let idExists = true;
  let attempts = 0;

  while (idExists && attempts <= 20) {
    attempts += 1;
    const newTransactionId = idGenerator("TRAN", 13);
    const response = await Transactions.find({
      transactionId: newTransactionId
    });
    if (response.length === 0) {
      idExists = false;
      return newTransactionId;
    }
  }

  return null;
}

module.exports = {
  idGenerator,
  userIdGenerator,
  customerIdGenerator,
  transactionIdGenerator,
};