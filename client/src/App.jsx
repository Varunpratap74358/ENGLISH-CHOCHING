import React, { useDebugValue, useEffect } from "react";
import Navbar from "./pages/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./componantes/Home";
import Subjects from "./componantes/Subjects";
import TeacherProfile from "./componantes/TeacherProfile";
import NotFound from "./componantes/NotFound";
import EventsPage from "./componantes/EventsPage";
import Login from "./componantes/Login";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getInfo } from "./store/slice/userSlice";
import { getAllevents } from "./store/slice/eventSlice";
import Event from "./componantes/Event";

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getInfo())
    dispatch(getAllevents())
  },[])
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/events" element={<EventsPage />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/event/:id" element={<Event />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
