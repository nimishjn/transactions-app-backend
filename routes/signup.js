const express = require("express");
const router = express.Router();
const hashPassword = require("../scripts/hashPassword");
const { userIdGenerator } = require("../scripts/idGenerator");
const { sendVerificationEmail } = require("../scripts/emailVerification");

const User = require("../models/user");

router.post("/", (req, res) => {
  const userData = {
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    password: req.body.password,
    mobile: req.body.mobile.trim(),
    businessName: req.body.businessName.trim(),
  };

  User.find({ email: userData.email })
    .exec()
    .then(async (users) => {
      if (users.length > 0) {
        return res.status(409).json({
          code: "L0",
        });
      } else {
        const { passwordValidationRegex } = require("../tools/constants");

        if (!userData.password.match(passwordValidationRegex)) {
          return res.status(406).json({
            code: "L1",
          });
        }

        const hashedPassword = await hashPassword(userData.password);

        if (!hashedPassword) {
          return res.status(500).json({
            code: "E2",
          });
        }

        const newUserId = await userIdGenerator();

        if (!newUserId) {
          return res.status(500).json({
            code: "E3",
          });
        }

        let newUser = new User({
          userId: newUserId,
          name: userData.name,
          password: hashedPassword,
          email: userData.email,
          mobile: userData.mobile,
          verified: false,
          businessName: userData.businessName,
        });

        newUser
          .save()
          .then(async (result) => {
            const emailSent = await sendVerificationEmail(
              userData.email,
              req.headers.host
            );

            if (!emailSent) {
              return res.status(201).json({
                code: "S0",
              });
            }

            return res.status(201).json({
              code: "S1",
            });
          })
          .catch((err) => {
            console.log("!signup.js - Error ", err);
            res.status(500).json({
              code: "E1",
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        code: "E1",
      });
    });
});

module.exports = router;
