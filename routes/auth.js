const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// Controllers
const { login, register, getNewAccessToken } = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/refresh").post(protect, getNewAccessToken);

module.exports = router;
