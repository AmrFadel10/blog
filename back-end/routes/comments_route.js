const {
  getAllCommentsCtrl,
  createCommentCtrl,
  updateCommentCtrl,
  getCommentCtrl,
  deleteCommentCtrl,
  countCommentsCtrl,
} = require("../controllers/comment_Ctrl");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const commentRoute = require("express").Router();
const validIdParam = require("../middlewares/validation_Id");

commentRoute
  .route("/")
  .get(verifyToken, getAllCommentsCtrl)
  .post(verifyToken, createCommentCtrl);

// /api/comments/count
commentRoute.route("/count").get(verifyTokenAndAdmin, countCommentsCtrl);

commentRoute
  .route("/:id")
  .put(validIdParam, verifyToken, updateCommentCtrl)
  .delete(validIdParam, verifyToken, deleteCommentCtrl)
  .get(validIdParam, verifyToken, getCommentCtrl);

module.exports = commentRoute;
