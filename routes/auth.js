const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  getNewAccessToken,
  resetPassword,
  forgotPassword,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/refresh").post(getNewAccessToken);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

module.exports = router;
