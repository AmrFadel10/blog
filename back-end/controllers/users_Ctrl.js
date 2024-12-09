const bcrypt = require("bcryptjs");
const User = require("../models/user_model");
const Comment = require("../models/comment_model");
const Post = require("../models/post_model");
const asyncHandler = require("express-async-handler");
const { updateUserValid } = require("../utils/validator/user_valid");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveAllImages,
} = require("../utils/cloudinary");

/**-------------------------------------------------------------------------------------
 * @desc    Get user by id
 * @route   /api/users/profile/:id
 * @method  GET
 * @access  public
----------------------------------------------------------------------------------------*/
exports.getUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("posts")
    .select("-password");
  if (!user) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  res.status(200).json(user);
});

/**-------------------------------------------------------------------------------------
 * @desc    Get All users
 * @route   /api/users/profile/
 * @method  GET
 * @access  private (Only Admin)
----------------------------------------------------------------------------------------*/
exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});
/**-------------------------------------------------------------------------------------
 * @desc    update user
 * @route   /api/users/profile/:id
 * @method  PUT
 * @access  private (Only user)
----------------------------------------------------------------------------------------*/
exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const { error } = updateUserValid(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  let hashedPassword;
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: hashedPassword,
        bio: req.body.bio,
      },
    },
    { new: true }
  )
    .select("-password")
    .populate("posts");

  res.status(200).json(user);
});

/**-------------------------------------------------------------------------------------
 * @desc    count users
 * @route   /api/users/count
 * @method  GET
 * @access  private (Only Admin)
----------------------------------------------------------------------------------------*/
exports.countAllUsersCtrl = asyncHandler(async (req, res) => {
  const count = await User.count();
  res.status(200).json({ usersCount: count });
});

/**-------------------------------------------------------------------------------------
 * @desc    profile photo upload
 * @route   /api/users/profile/profile-photo-upload
 * @method  GET
 * @access  private (Only logged account)
----------------------------------------------------------------------------------------*/
exports.prolfilePhotoUpload = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }
  // 1) image Path
  imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  // 2)uplaod on cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  // 3)get user from DB
  const user = await User.findById(req.user.id);
  // 4) delete image from cloudinary
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  // 4) edit user in db
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();
  res.status(200).json({
    message: "The photo uploaded successfully",
    profilePhoto: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
  //  5) delete image from server
  fs.unlinkSync(imagePath);
});

/**-------------------------------------------------------------------------------------
 * @desc    delete user
 * @route   /api/users/profile/:id
 * @method  DELETE
 * @access  private (Only Admin && user himself)
----------------------------------------------------------------------------------------*/
exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  // 1) get user from Db
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  //2) Get all posts from DB
  const posts = await Post.find({ user: user._id });

  //3) Get the public ids from posts
  const userPublicId = posts.map((user) => user.profilePhoto.publicId);
  //4) delete all posts image from cloudinary thats belong to this user
  if (userPublicId?.length > 0) {
    await cloudinaryRemoveAllImages(userPublicId);
  }
  //5) Delete profile photo by public id
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  //6) Delete  posts && Comments
  await Comment.deleteMany({ user: user._id });

  await Post.deleteMany({ user: user._id });
  //7)Delete user himself
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Your account has been deleted" });
});
