import { cloudinaryUploader,removeFromCloudinary } from "../utils/cloudinary.js";
import { Event } from '../model/eventsModel.js';
import path from 'path'

export const addEvent = async(req,res)=>{
    try {
        const {discription} = req.body;
        const file = req.file;
        if(!file){
            return res.status(404).json({
                message:"File is required"
            })
        }
        const result = await cloudinaryUploader(file.path)
        let event=await Event.create({
            discription,
            eventImage:{
                url:result.secure_url,
                public_id:result.public_id
            }
        })
        res.status(201).json({
            message:"Event added successfully...",
            event
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const deleteEvent = async(req,res)=>{
    try {
        const {id} = req.params;
        const event = await Event.findById(id)
        if(!event){
            return res.status(404).json({
                message:"Event not found"
            })
        }
        await removeFromCloudinary(event?.eventImage?.public_id)
        await Event.findByIdAndDelete(id)
        res.status(200).json({
            message:"Event deleted successfully..."
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const getAllEvents = async(req,res)=>{
    try {
        const events = await Event.find();
        res.status(200).json({
            events
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const getOneEvent = async(req,res)=>{
    try {
        const {id} = req.params;
        const event = await Event.findById(id)
        if(!event){
            return res.status(404).json({
                message:"Event not found with this id"
            })
        }
        res.status(200).json({
            event
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}