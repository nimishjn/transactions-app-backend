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

// const authMiddleware = require('./middleware/authorize');

// Signup route
const signupRoute = require("./routes/signup");
app.use("/signup", signupRoute);

// Verify email route
const verifyEmailRoute = require("./routes/verifyEmail");
app.use("/verifyEmail", verifyEmailRoute);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    },
  });
});

app.listen(3001, () => {
  console.log("> app.js - Server started!");
});
