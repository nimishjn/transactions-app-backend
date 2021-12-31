const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { sendVerificationEmail } = require("../scripts/emailVerification");
const generateAccessToken = require("../scripts/JWTGenerator");

const User = require("../models/user");

router.post("/", (req, res) => {
  const userData = {
    email: req.body.email.trim(),
    password: req.body.password,
  };

  User.find({ email: userData.email })
    .exec()
    .then(async (users) => {
      if (users.length !== 1) {
        return res.status(401).json({
          code: "L3",
        });
      }

      if (!users[0].verified) {
        const emailSent = await sendVerificationEmail(
          userData.email,
          req.headers.host
        );
        if (emailSent) {
          return res.status(401).json({
            code: "L4",
          });
        } else {
          return res.status(401).json({
            code: "L5",
          });
        }
      }

      try {
        const passwordValid = await bcrypt.compare(
          userData.password,
          users[0].password
        );

        console.log(userData.password, users[0].password, passwordValid);

        if (!passwordValid) {
          return res.status(401).json({
            code: "L6",
          });
        }

        const token = generateAccessToken({
          username: userData.email,
        });

        return res.status(200).json({
          code: "S2",
          token: token,
        });
      } catch (err) {
        console.log("!login.js - Error ", err);
        return res.status(500).json({
          code: "E2",
        });
      }
    })
    .catch((err) => {
      console.log("!login.js - Error ", err);
      return res.status(500).json({
        code: "E1",
      });
    });
});

module.exports = router;
