const asyncHandler = require("express-async-handler");
const {
  createUserValid,
  loginUserValid,
} = require("../utils/validator/user_valid");
const bcrypt = require("bcryptjs");
const User = require("../models/user_model");
const VerifyToken = require("../models/verify_model");
const crypto = require("crypto");
const verifyEmail = require("../utils/sendEmail");
/**-------------------------------------------------------------------------------------
 * @desc    Create a new user
 * @route   /api/auth/register
 * @method  POST
 * @access  public
----------------------------------------------------------------------------------------*/

exports.createUserCtrl = asyncHandler(async (req, res) => {
  const { error } = createUserValid(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "email already exists" });
  }
  const newAcc = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  //Todo sending email (verify account if not verify)
  const verify = await VerifyToken.create({
    userId: newAcc._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  const link = `${process.env.FRONTEND_URI}/users/${newAcc._id}/verify/${verify.token}`;

  const HTMLTemplate = `
  <div>
  <h3>Verify You email : ${newAcc.username} by click on link below :) </h3>
  <a href="${link}">Verify Now</a>
  </div>
  `;
  await verifyEmail(newAcc.email, "Verify Your account", HTMLTemplate);

  res.status(201).json({
    message: "We send a verification email to your email, please check it",
  });
});

/**-------------------------------------------------------------------------------------
 * @desc    login user
 * @route   /api/auth/login
 * @method  POST
 * @access  public
----------------------------------------------------------------------------------------*/
exports.loginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = loginUserValid(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordMatched = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  //Todo sending email (verify account if not verify)
  if (!user.isAccountVerified) {
    let checkVerifyToken = await VerifyToken.findOne({
      userId: user._id,
    });

    if (!checkVerifyToken) {
      checkVerifyToken = await VerifyToken.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
    }
    const link = `${process.env.FRONTEND_URI}/users/${user._id}/verify/${checkVerifyToken.token}`;

    const HTMLTemplate = `
    <div>
    <h3>Verify You email : ${user.username} by click on link below :) </h3>
    <a href="${link}">Verify Now</a>
    </div>
    `;
    await verifyEmail(user.email, "Verify Your account", HTMLTemplate);
    return res.status(400).json({
      message: "We send a verification link to your email, please check it",
    });
  }
  const token = user.generateToken();
  res.status(200).json({
    _id: user._id,
    username: user.username,
    profilePhoto: user.profilePhoto,
    isAdmin: user.isAdmin,
    token,
  });
});

/**-------------------------------------------------------------------------------------
 * @desc    Verify Token CTRL
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  public
----------------------------------------------------------------------------------------*/

exports.verifyTokenCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid link" });
  }

  const verifyToken = await VerifyToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verifyToken) {
    return res.status(400).json({ message: "Invalid link" });
  }

  user.isAccountVerified = true;
  await user.save();

  await verifyToken.deleteOne();

  res.status(200).json({ message: "Your account verified" });
});
