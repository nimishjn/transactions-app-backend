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
    const response = await User.find({ userId: newUserId });
    if (response.length === 0) {
      idExists = false;
      return newUserId;
    }
  }

  return null;
}

function customerIdGenerator() {
  return idGenerator("CUS", 10);
}

function transactionIdGenerator() {
  return idGenerator("TRAN", 13);
}

module.exports = {
  idGenerator,
  userIdGenerator,
  customerIdGenerator,
  transactionIdGenerator,
};
