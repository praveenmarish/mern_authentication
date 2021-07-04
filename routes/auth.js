const express = require("express");
const router = express.Router();

// Controllers
const { login, register, getNewAccessToken } = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/refresh").post(getNewAccessToken);

module.exports = router;
