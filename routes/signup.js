const express = require("express");
const router = express.Router();
const hashPassword = require("../scripts/hashPassword");
const { userIdGenerator } = require("../scripts/idGenerator");
const generateAccessToken = require("../scripts/JWTGenerator");

const User = require("../models/user");

router.post("/", (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    businessName: req.body.businessName,
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
          .then((result) => {
            const accessToken = generateAccessToken({
              username: userData.email,
            });

            res.status(201).json({
              code: "S0",
              token: accessToken,
            });
          })
          .catch((err) => {
            console.log(err);
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
