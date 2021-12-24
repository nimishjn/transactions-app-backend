const error_codes = {
  E0: "Undefined error occured",
  E1: "Error with database",
  E2: "Password hashing issue",
  E3: "Unique Id generation issue"
};

const logical_errors = {
  L0: "Mail exists",
  L1: "Password validation failed"
};

const success_codes = {
  S0: "Signup successful",
  S1: "Login successful",
};

export default { error_codes, logical_errors, success_codes };
