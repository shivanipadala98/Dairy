const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken/verify");

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ isUser: true });
});

module.exports = router;
