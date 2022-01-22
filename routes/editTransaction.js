const express = require("express");
const router = express.Router();

const Customer = require("../models/customer");
const Transaction = require("../models/transaction");

router.put("/", async (req, res) => {
  const transactionDetails = {
    userEmail: req.userEmail,
    customerId: req.body.customerId,
    transactionId: req.body.transactionId,
    amount: req.body.amount,
    timestamp: req.body.timestamp,
    description: req.body.description,
  };

  const response = await Transaction.updateOne(
    {
      userEmail: transactionDetails.userEmail,
      customerId: transactionDetails.customerId,
      transactionId: transactionDetails.transactionId,
    },
    transactionDetails
  ).catch((err) => {
    return res.status(500).json({ code: "E1" });
  });

  if (response.matchedCount === 0) {
    return res.status(406).json({ code: "L9" });
  }

  return res.status(200).json({ code: "S8" });
});

module.exports = router;
