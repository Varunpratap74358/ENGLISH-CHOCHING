import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  subjectName: String,
  subjectImage: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
},{timestamps:true});

export const Course = mongoose.model("Course",courseSchema)
