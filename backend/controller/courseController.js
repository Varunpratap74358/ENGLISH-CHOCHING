import {
  cloudinaryUploader,
  removeFromCloudinary,
} from "../utils/cloudinary.js";
import { Course } from "../model/courseModel.js";
import path from 'path'

export const addCourse = async (req, res) => {
  try {
    const { subjectName } = req.body;
    const file = req.file;
    if (!subjectName) {
      return res.status(404).json({
        message: "Subject name is required",
      });
    }
    if (!file) {
      return res.status(404).json({
        message: "File is required",
      });
    }
    // console.log(file)
    const result = await cloudinaryUploader(file.path);
    let course = await Course.create({
      subjectName,
      subjectImage: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
    res.status(201).json({
      message: "Subject added successfully...",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    // console.log(course)
    await removeFromCloudinary(course?.subjectImage?.public_id);
    await Course.findByIdAndDelete(id);
    res.status(200).json({
      message: "Course deleted successfully...",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
