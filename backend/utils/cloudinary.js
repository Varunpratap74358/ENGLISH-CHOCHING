import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.COUDINARY_CLOUD_NAME,
  api_key: process.env.COUDINARY_API_KEY,
  api_secret: process.env.COUDINARY_API_SECRET,
});

export default cloudinary;

export const cloudinaryUploader = async (file) => {
  try {
    if (!file) {
      throw new Error("File is required");
    }

    const filePath = path.resolve(file);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    fs.promises
      .unlink(filePath)
      .catch((err) => console.error("File deletion failed:", err));

    return result;
  } catch (error) {
    console.error("Upload failed:", error);

    try {
      await fs.promises.unlink(file);
    } catch (unlinkError) {
      console.error("File deletion failed after error:", unlinkError);
    }

    return null;
  }
};

export const removeFromCloudinary = async (publicID) => {
  try {
    if (!publicID) {
      throw new Error("public id is required");
    }
    const result = await cloudinary.uploader.destroy(publicID);
    return result;
  } catch (error) {
    console.log(error);
  }
};
