const express = require("express");
const {createOrUpdateUser} = require('../Controllers/auth')
const router = express.Router();

router.get("/create-user", createOrUpdateUser );

module.exports = router;