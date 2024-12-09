const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.cloudinaryUploadImage = async (imagePath) => {
  try {
    const data = cloudinary.uploader.upload(imagePath);
    return data;
  } catch (error) {
    console.log(error);
    throw new ApiError("internal server Error (Cloudinary)", 500);
  }
};

exports.cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const data = cloudinary.uploader.destroy(imagePublicId);
    return data;
  } catch (error) {
    console.log(error);
    throw new ApiError("internal server Error (Cloudinary)", 500);
  }
};

exports.cloudinaryRemoveAllImages = async (imagesPublicId) => {
  try {
    const data = cloudinary.v2.api.delete_resources(imagesPublicId);
    return data;
  } catch (error) {
    console.log(error);
    throw new ApiError("internal server Error (Cloudinary)", 500);
  }
};
