const ErrorResponse = require("../utils/errorResponse");
const { TokenVerification } = require("../utils/tokenVerification");
const {
  id_Getter,
  email_Getter,
  create_User,
} = require("../utils/DbFunctions");

// @desc    Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await email_Getter(email);
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = user.matchPassword(password);

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
    const user = await create_User(username, email, password);
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
  const decodedRrefreshToken = TokenVerification(
    refreshToken,
    process.env.JWT_SECRET_REFRESH
  );

  if (!decodedRrefreshToken) {
    return next(new ErrorResponse("Token not verified", 404));
  }

  try {
    const user = await id_Getter(decodedRrefreshToken.id);
    const accessToken = user.getSignedJwtToken();
    res.status(200).json({ sucess: true, accessToken });
  } catch (err) {
    next(err);
  }
};
