const asyncHandler = require("express-async-handler");
const path = require("path");
const Comment = require("../models/comment_model");
const User = require("../models/user_model");
const {
  createCommentValid,
  updateCommentValid,
} = require("../utils/validator/comment_Valid");
const ApiError = require("../utils/apiError");

/**-------------------------------------------------------------------------------------
 * @desc    create comment
 * @route   /api/comments
 * @method  POST
 * @access  public (user who login)
----------------------------------------------------------------------------------------*/
exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = createCommentValid(req.body);
  if (error) {
    throw new ApiError(error.details[0].message, 400);
  }
  const profile = await User.findById(req.user.id);
  const comment = await Comment.create({
    postId: req.body.postId,
    description: req.body.description,
    user: req.user.id,
    username: profile.username,
  });
  res.status(201).json(comment);
});

/**-------------------------------------------------------------------------------------
 * @desc    update comment
 * @route   /api/comments:id
 * @method  PUT
 * @access  public (user who login)
----------------------------------------------------------------------------------------*/
exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = updateCommentValid(req.body);
  if (error) {
    throw new ApiError(error.details[0].message, 400);
  }

  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    throw new ApiError("Invalid Comment id", 400);
  }
  if (req.user.id !== comment.user.toString()) {
    throw new ApiError("Only user who did write it, can edit it", 403);
  }
  comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      description: req.body.description,
    },
    { new: true }
  );
  res.status(200).json(comment);
});

/**--------------------------------------------------------------------------------------------
 * @desc   get All comments
 * @route  /api/comments/
 * @method GET
 * @access private
----------------------------------------------------------------------------------------------*/
exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.find().populate("user");
  res.status(200).json(comment);
});

/**--------------------------------------------------------------------------------------------
 * @desc   get  comment
 * @route  /api/comments/:id
 * @method GET
 * @access public
----------------------------------------------------------------------------------------------*/
exports.getCommentCtrl = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    throw new ApiError("Invalid Comment id", 400);
  }
  res.status(200).json(comment);
});

/**--------------------------------------------------------------------------------------------
 * @desc   Delete  comment
 * @route  /api/comments/:id
 * @method DELETE
 * @access private
----------------------------------------------------------------------------------------------*/
exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    throw new ApiError("Invalid Comment id", 400);
  }
  if (req.user.id !== comment.user.toString() && !req.user.isAdmin) {
    throw new ApiError("Only user or Admin can delete it", 403);
  }
  await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Comment has been deleted successfully" });
});

/**-------------------------------------------------------------------------------------
 * @desc    count comment
 * @route   /api/comments/count
 * @method  GET
 * @access  private (Only Admin) 
----------------------------------------------------------------------------------------*/
exports.countCommentsCtrl = asyncHandler(async (req, res) => {
  let comment = await Comment.count();

  res.status(200).json(comment);
});
