const { authCheck } = require('../middleware/user')
const express = require("express");

const router = express.Router();

router.post("/create-or-update-user", (req, res) => {
  res.json({
    data: "hey you hit create-or-update-user API endpoint",
  });
});

module.exports = router;