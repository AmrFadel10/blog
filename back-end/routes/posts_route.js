const express = require("express");
const {
  getAllPostsCtrl,
  getPostCtrl,
  createPostCtrl,
  countAllPostsCtrl,
  toggleLikeCtrl,
  updatePostCtrl,
  deletePostCtrl,
  updatePostImageCtrl,
} = require("../controllers/post_Ctrl");
const { verifyToken } = require("../middlewares/verifyToken");
const validIdParam = require("../middlewares/validation_Id");
const uploadPhoto = require("../middlewares/upload_Photo");
const postsRoute = express.Router();

// api/posts/
postsRoute
  .route("/")
  .get(getAllPostsCtrl)
  .post(verifyToken, uploadPhoto.single("image"), createPostCtrl);

// api/posts/count
postsRoute.route("/count").get(countAllPostsCtrl);

// api/posts/upload-image/:id
postsRoute
  .route("/upload-image/:id")
  .put(
    validIdParam,
    verifyToken,
    uploadPhoto.single("image"),
    updatePostImageCtrl
  );

// api/posts/:id
postsRoute
  .route("/:id")
  .get(validIdParam, getPostCtrl)
  .put(validIdParam, verifyToken, updatePostCtrl)
  .delete(validIdParam, verifyToken, deletePostCtrl);

// api/posts/like:id
postsRoute.route("/like/:id").put(validIdParam, verifyToken, toggleLikeCtrl);

// .put(validIdParam,uploadPhoto.single("image"),updatePostImageCtrl);
module.exports = postsRoute;
