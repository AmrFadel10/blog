const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 1000,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentsSchema);

module.exports = Comment;
