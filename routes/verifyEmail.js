const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fs = require("fs");

const User = require("../models/user");

router.get("/:token", (req, res) => {
  const token = req.params.token;

  try {
    const emailFromToken = jwt.verify(token, process.env.TOKEN_SECRET).username;

    fs.readFile("assets/emailVerified.html", null, function (err, data) {
      if (err) {
        console.log("!verifyEmail.js - Error ", err);

        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.write(
          "Some unknown error occured. We are sorry for the inconvinience."
        );

        return res.send();
      } else {
        User.updateOne({ email: emailFromToken }, { verified: true })
          .then((response) => {
            res.writeHead(200, {
              "Content-Type": "text/html",
            });

            res.write(data);

            return res.send();
          })
          .catch((err) => {
            console.log("!verifyEmail.js - Error ", err);
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });

            res.write(
              "Some unknown error occured. We are sorry for the inconvinience."
            );

            return res.send();
          });
      }
    });
  } catch (err) {
    fs.readFile("assets/invalidLink.html", null, function (err, data) {
      if (err) {
        console.log("!verifyEmail.js - Error ", err);

        res.writeHead(500, {
          "Content-Type": "text/plain",
        });

        res.write(
          "Some unknown error occured. We are sorry for the inconvinience. 1"
        );

        return res.send();
      } else {
        res.writeHead(400, {
          "Content-Type": "text/html",
        });

        res.write(data);

        return res.send();
      }
    });
  }
});

module.exports = router;
