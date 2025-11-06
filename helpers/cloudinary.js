const cloudinary = require("cloudinary");
const fs = require("fs");
const path = require("path");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
async function uploadImage(imgPathUrl) {
  try {
    const result = await cloudinary.uploader.upload(imgPathUrl);
    fs.unlinkSync(imgPathUrl);
    return result;
  } catch (error) {
    fs.unlinkSync(imgPathUrl);
    res.status(500).json({
      success: false,
      message: "Can't create Product",
      error: error.message,
    });
  }
}
module.exports = uploadImage;
