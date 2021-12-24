function idGenerator(prefix, length) {
  let result = prefix;
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function userIdGenerator(length) {
  return idGenerator("USER", 7);
}

function customerIdGenerator(length) {
  return idGenerator("CUS", 10);
}

function transactionIdGenerator(length) {
  return idGenerator("USER", 13);
}

module.exports = {
  idGenerator,
  userIdGenerator,
  customerIdGenerator,
  transactionIdGenerator,
};
