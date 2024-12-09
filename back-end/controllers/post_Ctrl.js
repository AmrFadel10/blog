const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const Post = require("../models/post_model");
const Comment = require("../models/comment_model");

const {
  createPostValid,
  updatePostValid,
} = require("../utils/validator/post_valid");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/**-------------------------------------------------------------------------------------
 * @desc    create Post
 * @route   /api/posts
 * @method  POST
 * @access  public (user who login)
----------------------------------------------------------------------------------------*/
exports.createPostCtrl = asyncHandler(async (req, res) => {
  //1) validation File
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  //2) validation Data
  const { error } = createPostValid(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //3) get image path
  const imagePath = path.join(__dirname, "../images", `${req.file.filename}`);

  //4)upload image
  const result = await cloudinaryUploadImage(imagePath);

  //5)create post
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    imagePost: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  //6) response client
  res.status(200).json(post);

  //7) remove image from server
  fs.unlinkSync(imagePath);
});

/**-------------------------------------------------------------------------------------
 * @desc    get All Posts
 * @route   /api/posts
 * @method  GET
 * @access  public
 * ----------------------------------------------------------------------------------------*/
exports.getAllPostsCtrl = asyncHandler(async (req, res) => {
  //1)pagination
  const limit = (req.query.limit * 1) | 5;
  const page = req.query.page * 1;
  const skip = (page - 1) * limit;

  //2)filtering
  filterArr = ["skip", "limit", "page", "keywords", "fields"];
  filterObj = { ...req.query };
  filterArr.forEach((e) => delete filterObj[e]);
  let postsQuery;
  if (!page) {
    postsQuery = Post.find(filterObj)
      .populate("user", "-password")
      .populate("comments");
  } else {
    postsQuery = Post.find(filterObj)
      .limit(limit)
      .skip(skip)
      .populate("user", "-password")
      .populate("comments");
  }

  //3)soting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    postsQuery.sort(sortBy);
  } else {
    postsQuery.sort("-createdAt");
  }

  //4) Limit fields
  if (req.query.fields) {
    const select = req.query.fields.split(",").join(" ");
    postsQuery.select(select);
  } else {
    postsQuery.select("-__v");
  }

  //5) Searching
  if (req.query.keywords) {
    const searchobj = {
      $or: [
        { title: { $regex: req.query.keywords, $options: "i" } },
        { desription: { $regex: req.query.keywords, $options: "i" } },
        { category: { $regex: req.query.keywords, $options: "i" } },
      ],
    };
    postsQuery.find(searchobj);
  } else {
    postsQuery.select("-__v");
  }
  const posts = await postsQuery;
  res.status(200).json(posts);
});

/**-------------------------------------------------------------------------------------
 * @desc    get single Post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public
----------------------------------------------------------------------------------------*/
exports.getPostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: "user",
      select: "-password",
    })
    .populate("comments");
  if (!post) {
    return res.status(400).json({ message: "Invalid post Id" });
  }

  res.status(200).json(post);
});

/**-------------------------------------------------------------------------------------
 * @desc    count Posts
 * @route   /api/posts/count
 * @method  GET
 * @access  private {only admin}
----------------------------------------------------------------------------------------*/
exports.countAllPostsCtrl = asyncHandler(async (req, res) => {
  const postCount = await Post.count();
  res.status(200).json({ postCount });
});

/**-------------------------------------------------------------------------------------
 * @desc    update post
 * @route   /api/posts/:id
 * @method  PUT
 * @access  private {only user himself}
----------------------------------------------------------------------------------------*/
exports.updatePostCtrl = asyncHandler(async (req, res) => {
  const { error } = updatePostValid(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Invalid post id" });
  }
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "Only user himself can update this post" });
  }
  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  )
    .populate("user", "-password")
    .populate("comments");
  res.status(200).json(updatePost);
});

/**-------------------------------------------------------------------------------------
 * @desc    update post
 * @route   /api/posts/upload-image/:id
 * @method  PUT
 * @access  private {only user himself}
----------------------------------------------------------------------------------------*/
exports.updatePostImageCtrl = asyncHandler(async (req, res) => {
  //validation
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  //find post
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Invalid post id" });
  }
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: "Only user himself can update this picture post" });
  }

  //delete image
  await cloudinaryRemoveImage(post.imagePost.publicId);

  //add image
  const imagePath = path.join(__dirname, "../images", `${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  //update image
  await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        imagePost: {
          url: result.secure_url,
          publicId: result.publicId,
        },
      },
    },
    { new: true }
  );

  res.status(200).json({ message: "The images updated successfully" });

  //delete image from server
  fs.unlinkSync(imagePath);
});

/**-------------------------------------------------------------------------------------
 * @desc    delete post
 * @route   /api/posts/:id
 * @method  DELETE
 * @access  private {only admin or user}
----------------------------------------------------------------------------------------*/
exports.deletePostCtrl = asyncHandler(async (req, res) => {
  //find and delete
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  if (req.user.id !== post.user.toString() && !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Only user himself && admin can delete this post" });
  }
  await Post.findByIdAndDelete(req.params.id);
  //delete image
  await cloudinaryRemoveImage(post.imagePost.publicId);

  // Delete Comments
  await Comment.deleteMany({ postId: post._id });

  res.status(200).json({ message: "Post has been deleted" });
});

/**-------------------------------------------------------------------------------------
 * @desc    Toggle like
 * @route   /api/posts/like/:id
 * @method  POST
 * @access  public {auth users}
----------------------------------------------------------------------------------------*/
exports.toggleLikeCtrl = asyncHandler(async (req, res) => {
  //find post
  let post = await Post.findById(req.params.id.toString());
  if (!post) {
    return res.status(400).json({ message: "Invalid post id" });
  }
  if (post.Likes.find((e) => e.toString() === req.user.id)) {
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { Likes: req.user.id },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { Likes: req.user.id },
      },
      { new: true }
    );
  }
  res.status(200).json(post);
});
