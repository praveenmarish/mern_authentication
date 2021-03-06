const ErrorResponse = require("../utils/errorResponse");
const { TokenVerification } = require("../utils/tokenVerification");
const sendEmail = require("../utils/sendEmail");
const { TokenEncodeDecode } = require("../utils/ResetToken");
const {
  id_Getter,
  email_Getter,
  create_User,
  reset_token_checker,
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

// @desc    Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await email_Getter(email);

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `${process.env.URL}${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = TokenEncodeDecode(req.params.resetToken);

  try {
    const user = await reset_token_checker(resetPasswordToken);

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};
