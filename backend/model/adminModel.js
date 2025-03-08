import mongoose, { mongo } from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password:{
    type:String
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  profileImage: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
},{timestamps:true});

export const Admin = mongoose.model("Admin",adminSchema)
