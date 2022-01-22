const express = require("express");
const bodyParser = require("body-parser");

const app = express();

require("dotenv/config");
require("./models/dbInit");

const cors = require("cors");
app.use(cors());

// require("./scripts/codeTester");

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

const authMiddleware = require("./middleware/authorize");

// Signup route
const signupRoute = require("./routes/signup");
app.use("/signup", signupRoute);

// Verify email route
const verifyEmailRoute = require("./routes/verifyEmail");
app.use("/verifyEmail", verifyEmailRoute);

// Login route
const loginRoute = require("./routes/login");
app.use("/login", loginRoute);

// Add customer route
const addCustomerRoute = require("./routes/addCustomer");
app.use("/customer/add", authMiddleware, addCustomerRoute);

// List all customers route
const listCustomersRoute = require("./routes/listCustomers");
app.use("/customer/all", authMiddleware, listCustomersRoute);

// Remove customer route
const removeCustomerRoute = require("./routes/removeCustomer");
app.use("/customer/remove", authMiddleware, removeCustomerRoute);

// Edit customer route
const editCustomerRoute = require("./routes/editCustomer");
app.use("/customer/edit", authMiddleware, editCustomerRoute);

// Add transactions route
const addTransactionRoute = require("./routes/addTransaction");
app.use("/transaction/add", authMiddleware, addTransactionRoute);

// Edit transactions route
const editTransactionRoute = require("./routes/editTransaction");
app.use("/transaction/edit", authMiddleware, editTransactionRoute);

app.use((error, req, res, next) => {
  console.log("! app.js - Server error ", error);
  res.status(error.status || 500);
  res.json({
    code: "E0",
  });
});

app.listen(3001, () => {
  console.log("> app.js - Server started!");
});
