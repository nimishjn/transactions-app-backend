const express = require("express");
const router = express.Router();

const Customer = require("../models/customer");

router.get("/", (req, res) => {
  Customer.find({ userEmail: req.userEmail })
    .then((customers) => {
      const response = customers.map((element) => {
        return {
          customerId: element.customerId,
          name: element.name,
          mobile: element.mobile,
        };
      });
      
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log("!listCustomers.js - Error ", err);
      res.status(500).json({
        code: "E1",
      });
    });
});

module.exports = router;
