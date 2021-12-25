const bcrypt = require("bcryptjs");

const hashPassword = async (
  password,
  saltRounds = parseInt(process.env.SALT_ROUNDS)
) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log("! hashPassword.js - Error occuried in becrypt", error);
  }

  return null;
};

module.exports = hashPassword;