const express = require("express");
const router = express.Router();

const Transaction = require("../models/transaction");

router.get("/", (req, res) => {
  Transaction.find({
    userEmail: req.userEmail,
    customerId: req.body.customerId,
  })
    .then((transactions) => {
      const response = transactions.map((element) => {
        return {
          transactionId: element.transactionId,
          customerId: element.customerId,
          amount: element.amount,
          timestamp: element.timestamp,
          description: element.description,
        };
      });

      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log("!listTransactions.js - Error ", err);
      res.status(500).json({
        code: "E1",
      });
    });
});

module.exports = router;
