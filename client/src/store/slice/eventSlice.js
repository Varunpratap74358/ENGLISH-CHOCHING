import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { EVENT_API_POINT } from "../../API/api";


const eventSlice = createSlice({
    name:"event",
    initialState:{
        loading:false,
        events:[],
    },
    reducers:{
        uploadeventRequest(state,action){
            state.loading=true
        },
        uploadeventSuccess(state,action){
            state.loading=false
        },
        uploadeventFaild(state,action){
            state.loading=false
        },

        deleteEvenfRequest(state,action){
            state.loading=true
        },
        deleteEvenfSuccess(state,action){
            state.loading=false
        },
        deleteEvenfFaild(state,action){
            state.loading=false
        },

        getAlleventsSuccess(state,action){
            state.events= action.payload.events
        },

    }
})

export const getAllevents = ()=>async(dispatch)=>{
    try {
        const {data} = await axios.get(`${EVENT_API_POINT}/all`,{withCredentials:true})
        // console.log(data)
        dispatch(eventSlice.actions.getAlleventsSuccess(data))
    } catch (error) {
        console.log(error)
    }
}

export const uplodEvent=(formData)=>async(dispatch)=>{
    dispatch(eventSlice.actions.uploadeventRequest())
    try {
        const {data} = await axios.post(`${EVENT_API_POINT}/add`,formData,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}})
        dispatch(eventSlice.actions.uploadeventSuccess())
        toast.success(data.message)
        getAllevents()
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
        dispatch(eventSlice.actions.uploadeventFaild())
    }
}

export const deleteEvent=(id)=>async(dispatch)=>{
    dispatch(eventSlice.actions.deleteEvenfRequest())
    try {
        const {data} = await axios.delete(`${EVENT_API_POINT}/delete/${id}`,{withCredentials:true})
        getAllevents()
        dispatch(eventSlice.actions.deleteEvenfSuccess())
        toast.success(data.message)
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
        dispatch(eventSlice.actions.deleteEvenfFaild())
    }
}



export default eventSlice.reducer