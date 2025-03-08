import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import eventSlice from './slice/eventSlice'
import courseSlice from "./slice/courseSlice"

export const store = configureStore({
    reducer:{
        user: userReducer,
        event:eventSlice,
        course:courseSlice
    }
})