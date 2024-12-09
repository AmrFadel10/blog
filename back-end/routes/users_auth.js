const express = require("express");
const {
  getUserCtrl,
  getAllUsersCtrl,
  updateUserCtrl,
  countAllUsersCtrl,
  prolfilePhotoUpload,
  deleteUserCtrl,
} = require("../controllers/users_Ctrl");
const {
  verifyTokenAndAdmin,
  verifyTokenForUser,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");
const validIdParam = require("../middlewares/validation_Id");
const uploadPhoto = require("../middlewares/upload_Photo");
const usersRoute = express.Router();

// api/users/profile
usersRoute.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// api/users/profile/:id
usersRoute
  .route("/profile/:id")
  .get(validIdParam, getUserCtrl)
  .put(validIdParam, verifyTokenForUser, updateUserCtrl)
  .delete(validIdParam, verifyTokenAndAuthorization, deleteUserCtrl);

// api/users/count
usersRoute.route("/count").get(verifyTokenAndAdmin, countAllUsersCtrl);

// api/users/profile-photo-upload
usersRoute
  .route("/profile/profile-photo-upload")
  .post(verifyToken, uploadPhoto.single("image"), prolfilePhotoUpload);

module.exports = usersRoute;
