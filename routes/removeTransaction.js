const express = require("express");
const router = express.Router();

const Transaction = require("../models/transaction");

router.delete("/:transactionId", (req, res) => {
  const transactionId = req.params.transactionId;

  Transaction.deleteOne({
    transactionId: transactionId,
    userEmail: req.userEmail,
  })
    .then((response) => {
      if (response.deletedCount === 0) {
        return res.status(404).json({
          code: "L9",
        });
      }

      return res.status(200).json({
        code: "S7",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: "E1",
      });
    });
});

module.exports = router;
