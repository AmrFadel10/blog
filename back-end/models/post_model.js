const mongoose = require("mongoose");
const PostsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
    },
    imagePost: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    Likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
PostsSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});
const Post = mongoose.model("Post", PostsSchema);

module.exports = Post;
