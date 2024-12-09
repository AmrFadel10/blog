const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { forgetPasswordValid } = require("../utils/validator/password_valid");
const bcrypt = reuqire("bcryptjs");
const User = require("../models/user_model");
const VerifyToken = require("../models/verify_model");

/**-------------------------------------------------------------------------------------
 * @desc    Forget password
 * @route   /api/password/forget-password-link
 * @method  POST
 * @access  public 
----------------------------------------------------------------------------------------*/
exports.forgetPasswordCtrl = asyncHandler(async (req, res) => {
  const { error } = forgetPasswordValid(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  let verifyToken = await VerifyToken.findOne({ userId: user._id });

  if (!verifyToken) {
    verifyToken = await VerifyToken.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
  }
  const link = `${process.env.FRONTEND_URI}/reset-password/${user.userId}/${verifyToken.token}`;

  const HTMLTemplate = `<div>
    <h3>Click on click below to reset your password </h3>
    <a href="${link}">Click here</a>
  </div>`;

  await sendEmail(user.email, "reset password", HTMLTemplate);

  res
    .status(200)
    .json({ message: "we send email to your email, please check it now! " });
});

/**-------------------------------------------------------------------------------------
 * @desc    Reset password
 * @route   /api/password/reset-password/:userId/:token
 * @method  GET
 * @access  public 
----------------------------------------------------------------------------------------*/
exports.getResetPasswordCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }

  let verifyToken = await VerifyToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verifyToken) {
    return res.status(400).json({ message: "Invalid link" });
  }
  res.status(200).json({ message: "Success Link" });
});

/**-------------------------------------------------------------------------------------
 * @desc    Reset password
 * @route   /api/password/reset-password/:userId/:token
 * @method  POST
 * @access  public 
----------------------------------------------------------------------------------------*/
exports.postResetPasswordCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }

  let verifyToken = await VerifyToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verifyToken) {
    return res.status(400).json({ message: "Invalid link" });
  }

  if (!user.isAccountVerified) {
    user.isAccountVerified = true;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();
  await verifyToken.deleteOne();

  res
    .status(200)
    .json({ message: "Password has been changed successfully :)" });
});
