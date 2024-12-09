const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  verifyTokenCtrl,
} = require("../controllers/auth_Ctrl");
const authRoute = express.Router();

// api/auth/register
authRoute.route("/register").post(createUserCtrl);

// api/auth/login
authRoute.route("/login").post(loginUserCtrl);

// api/auth/:userId/verify/:token
authRoute.route("/:userId/verify/:token").get(verifyTokenCtrl);

module.exports = authRoute;
