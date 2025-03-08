import { Admin } from "../model/adminModel.js";
import {
  cloudinaryUploader,
  removeFromCloudinary,
} from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    const file = req.file;

    const user = await Admin.find();
    if (user.length) {
      return res.status(402).json({
        message: "Only One Admin Can register",
      });
    }
    if (!file) {
      return res.status(404).json({
        message: "Image is required",
      });
    }
    let result = await cloudinaryUploader(file.path);
    const hashPassword = await bcrypt.hash(password, 10);
    let admin = await Admin.create({
      name,
      email,
      phone,
      address,
      password: hashPassword,
      profileImage: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
    res.status(201).json({
      message: "Admin register successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    let user = await Admin.findOne();
    // console.log(user)
    user = await Admin.findOneAndUpdate(user._id, req.body, { new: true });
    user.save();
    res.status(200).json({
      message: "Updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    let user = await Admin.findOne();
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Step 1: remove image from cloudinary
    if (user.profileImage.public_id) {
      await removeFromCloudinary(user.profileImage.public_id);
    }

    // Step 2: Upload New Image**
    const result = await cloudinaryUploader(file.path);

    // Step 3: Update Database**
    user.profileImage = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await user.save();

    res.status(200).json({
      message: "Profile image updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Email or password is wrong",
        
      });
    }
    const mathchPassword = await bcrypt.compare(password, user.password);
    if (!mathchPassword) {
      return res.status(404).json({
        message: "Email or password is wrong",
      });
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login Successfully",
        token
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getInfo = async (req, res) => {
  try {
    const user = await Admin.findOne();
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
