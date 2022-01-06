const express = require("express");
const router = express.Router();

const { customerIdGenerator } = require("../scripts/idGenerator");

const Customer = require("../models/customer");

router.post("/", (req, res) => {
  const customerDetails = {
    name: req.body.name.trim(),
    mobile: req.body.mobile.trim(),
    userEmail: req.userEmail,
  };

  Customer.find({
    name: customerDetails.name,
    userEmail: customerDetails.userEmail,
  })
    .then(async (customers) => {
      if (customers.length > 0) {
        return res.status(406).json({
          code: "L7",
        });
      }

      const newCustomerId = await customerIdGenerator();

      if (!newCustomerId) {
        return res.status(500).json({
          code: "E3",
        });
      }

      let newCustomer = new Customer({
        customerId: newCustomerId,
        userEmail: customerDetails.userEmail,
        name: customerDetails.name,
        mobile: customerDetails.mobile,
      });

      newCustomer
        .save()
        .then((result) => {
          return res.status(200).json({
            code: "S3",
          });
        })
        .catch((err) => {
          console.log("!addCustomer.js - Error ", err);
          res.status(500).json({
            code: "E1",
          });
        });
    })
    .catch((err) => {
      console.log("!addCustomer.js - Error ", err);
      res.status(500).json({
        code: "E1",
      });
    });
});

module.exports = router;
