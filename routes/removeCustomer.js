const express = require("express");
const router = express.Router();

const Customer = require("../models/customer");

router.delete("/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  Customer.deleteOne({ customerId: customerId, userEmail: req.userEmail })
    .then((response) => {
      if (response.deletedCount === 0) {
        return res.status(404).json({
          code: "L8",
        });
      }

      return res.status(200).json({
        code: "S4",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        code: "E1",
      });
    });
});

module.exports = router;
