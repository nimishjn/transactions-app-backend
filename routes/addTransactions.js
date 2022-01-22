const express = require("express");
const router = express.Router();

const {
  customerIdGenerator,
  transactionIdGenerator,
} = require("../scripts/idGenerator");

const Customer = require("../models/customer");
const Transaction = require("../models/transactions");

router.post("/", (req, res) => {
  const transactionDetails = {
    userEmail: req.userEmail,
    customerId: req.body.customerId,
    amount: req.body.amount,
    timestamp: req.body.timestamp,
    description: req.body.description,
  };

  Customer.find({
    customerId: transactionDetails.customerId,
    userEmail: transactionDetails.userEmail,
  })
    .then(async (customers) => {
      if (customers.length === 0) {
        return res.status(406).json({
          code: "L8",
        });
      }

      const newTransactionId = await transactionIdGenerator();

      if (!newTransactionId) {
        return res.status(500).json({
          code: "E3",
        });
      }

      let newTransaction = new Transaction({
        transactionId: newTransactionId,
        customerId: transactionDetails.customerId,
        userEmail: transactionDetails.userEmail,
        amount: transactionDetails.amount,
        timestamp: transactionDetails.timestamp,
        description: transactionDetails.description,
      });

      newTransaction
        .save()
        .then((result) => {
          return res.status(200).json({
            code: "S6",
          });
        })
        .catch((err) => {
          console.log("!addTransaction.js - Error ", err);
          res.status(500).json({
            code: "E1",
          });
        });
    })
    .catch((err) => {
      console.log("!addTransaction.js - Error ", err);
      res.status(500).json({
        code: "E1",
      });
    });
});

module.exports = router;
