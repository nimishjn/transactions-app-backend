const error_codes = {
  E0: "Undefined error occured",
  E1: "Error with database",
  E2: "Password hashing issue",
  E3: "Unique Id generation issue",
  E4: "Token Invalid"
};

const logical_errors = {
  L0: "Email exists",
  L1: "Password validation failed",
  L3: "Email not registered",
  L4: "Email not verified, email verification sent",
  L5: "Email not verified, email verification failed to send",
  L6: "Incorrect Password",
};

const success_codes = {
  S0: "Signup successful, email verification sent",
  S1: "Signup successful, email verification failed to send",
  S2: "Login successful",
};

export default { error_codes, logical_errors, success_codes };
