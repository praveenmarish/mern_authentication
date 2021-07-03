const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// @desc    Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const accessToken = user.getSignedJwtToken();
    const refreshToken = user.getSignedJwtRefreshToken();
    res.status(200).json({ sucess: true, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

// @desc    Register user
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    const accessToken = user.getSignedJwtToken();
    const refreshToken = user.getSignedJwtRefreshToken();
    res.status(200).json({ sucess: true, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

// @desc    Get new access token
exports.getNewAccessToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    const accessToken = user.getSignedJwtToken();
    res.status(200).json({ sucess: true, accessToken });
  } catch (err) {
    next(err);
  }
};
