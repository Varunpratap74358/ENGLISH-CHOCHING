import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  discription: String,
  eventImage: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
},{timestamps:true});

export const Event = mongoose.model("Event",eventSchema)
