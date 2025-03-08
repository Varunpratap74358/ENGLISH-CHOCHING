import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_POINT } from "../../API/api";
// import jwt from 'jsonwebtoken'


const userSlice = createSlice({
    name:"user",
    initialState:{
        loading:false,
        isAuthenticated:false,
        user:{},
    },
    reducers:{

        // login requests
        loginRequest(state,action){
            state.loading = true,
            state.isAuthenticated=false
        },
        loginSuccess(state,action){
            state.loading = false,
            state.isAuthenticated=true
        },
        loginFaild(state,action){
            state.loading = false,
            state.isAuthenticated=false
        },


        // get userProfile
        getUserRequest(state,action){
            state.loading = true,
            state.user = {}
        },
        getUserSuccess(state,action){
            state.loading = false,
            state.user = action.payload.user
        },
        getUserFaild(state,action){
            state.loading = false,
            state.user = {}
        },

        //update detail
        updateDetailRequest(state,action){
            state.loading = true,
            state.user = state.user
        },
        updateDetailSuccess(state,action){
            state.loading = false,
            state.user = action.payload.user
        },
        updateDetailFaild(state,action){
            state.loading = false,
            state.user = state.user
        },


        // change profile photo
        updateProfilePhotoRequest(state,action){
            state.loading = true
        },
        updateProfilePhotoSuccess(state,action){
            state.loading = false
        },
        updateProfilePhotoFaild(state,action){
            state.loading = false
        },


        //logout
        logoutRequest(state,action){
            state.loading=true
        },
        logoutSuccess(state,action){
            state.loading=false
        },
        logoutFaild(state,action){
            state.loading=false
        },


        creareAllError(state,action){
            state.user = state.user,
            state.isAuthenticated = state.isAuthenticated,
            state.loading = false
        }

    }
})

export const login = (formData) =>async(dispatch)=>{
    dispatch(userSlice.actions.loginRequest())
    try {
        const {data} = await axios.post(`${USER_API_POINT}/login`,formData,{
            withCredentials:true,
            headers:{"Content-Type":"application/json"}
        })
        dispatch(userSlice.actions.loginSuccess())
        toast.success(data.message)
        localStorage.setItem("isTeacher",data.token)
    } catch (error) {
        console.log(error)
        dispatch(userSlice.actions.loginFaild())
        toast.error(error?.response?.data?.message)
        localStorage.setItem("isTeacher","")
    }
}

export const getInfo = () =>async(dispatch)=>{
    dispatch(userSlice.actions.getUserRequest())
    try {
        const {data} = await axios.get(`${USER_API_POINT}/info`,{withCredentials:true})
        // console.log(data)
        dispatch(userSlice.actions.getUserSuccess(data))
        dispatch(userSlice.actions.creareAllError())
    } catch (error) {
        console.log(error)
        dispatch(userSlice.actions.creareAllError())
    }
}

export const updateDetail = (formData)=>async(dispatch)=>{
    dispatch(userSlice.actions.updateDetailRequest())
    try {
        const {data} = await axios.put(`${USER_API_POINT}/update`,formData,{withCredentials:true,headers:{"Content-Type":"application/json"}})
        dispatch(userSlice.actions.updateDetailSuccess(data))
        getInfo()
        toast.success(data?.message)
        dispatch(userSlice.actions.creareAllError())
    } catch (error) {
        console.log(error)
        dispatch(userSlice.actions.updateDetailFaild())
        toast.error(error?.response?.data?.message || "Somthing went wrong")
        dispatch(userSlice.actions.creareAllError())
    }
}

export const updateProfilePhoto=(formdata)=>async(dispatch)=>{
    dispatch(userSlice.actions.updateProfilePhotoRequest())
    try {
        const {data} = await axios.put(`${USER_API_POINT}/update-profile-img`,formdata,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}})
        toast.success(data.message)
        getInfo()
        dispatch(userSlice.actions.updateDetailSuccess())
        dispatch(userSlice.actions.creareAllError())
    } catch (error) {
        toast.error(error?.response?.data?.message || "Somthing went wrong")
        dispatch(userSlice.actions.updateDetailFaild())
        dispatch(userSlice.actions.creareAllError())
        console.log(error)
    }
}


export const logoutFunction=()=>async(dispatch)=>{
    try {
        const {data} = await axios.get(`${USER_API_POINT}/logout`,{withCredentials:true})
        toast.success(data.message)
        localStorage.setItem("isTeacher","")
        dispatch(userSlice.actions.creareAllError())
        window.location.reload()
    } catch (error) {
        toast.error(error?.response?.data?.message || "Somthing went wrong")
        dispatch(userSlice.actions.creareAllError())
    }
}

export default userSlice.reducer