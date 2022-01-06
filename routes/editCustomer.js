const express = require("express");
const router = express.Router();

const Customer = require("../models/customer");

router.put("/", async (req, res) => {
  const customerDetails = {
    customerId: req.body.customerId,
    name: req.body.name.trim(),
    mobile: req.body.mobile.trim(),
    userEmail: req.userEmail,
  };

  const response = await Customer.updateOne(
    {
      userEmail: customerDetails.userEmail,
      customerId: customerDetails.customerId,
    },
    customerDetails
  ).catch((err) => {
    return res.status(500).json({ code: "E1" });
  });

  if (response.matchedCount === 0) {
    return res.status(406).json({ code: "L8" });
  }

  return res.status(200).json({ code: "S5" });
});

module.exports = router;
