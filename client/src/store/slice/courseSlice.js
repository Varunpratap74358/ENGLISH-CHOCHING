import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { COURSE_API_POINT } from "../../API/api";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    loading: false,
    courses: [],
  },
  reducers: {
    addCourseRequest(state, action) {
      state.loading = true;
    },
    addCourseSuccess(state, action) {
      state.loading = false;
    },
    addCourseFaild(state, action) {
      state.loading = false;
    },

    getAllSubjectSuccess(state, action) {
      (state.loading = false), (state.courses = action.payload.courses);
    },
  },
});

export const AddCourse = (formData) => async (dispatch) => {
  dispatch(courseSlice.actions.addCourseRequest());
  try {
    const { data } = await axios.post(
      `${COURSE_API_POINT}/add-course`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    toast.success(data.message);
    dispatch(courseSlice.actions.addCourseSuccess());
    dispatch(getAllSubjects());
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Somting went wrong");
    dispatch(courseSlice.actions.addCourseFaild());
  }
};

export const getAllSubjects = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${COURSE_API_POINT}/all-course`, {
      withCredentials: true,
    });
    // console.log(data)
    dispatch(courseSlice.actions.getAllSubjectSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = (id) => async (dispatch) => {
  dispatch(courseSlice.actions.addCourseRequest());
  try {
    const { data } = await axios.delete(
      `${COURSE_API_POINT}/delete-course/${id}`
    );
    toast.success(data.message);
    dispatch(courseSlice.actions.addCourseSuccess());
    dispatch(getAllSubjects());
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Somting went wrong");
    dispatch(courseSlice.actions.addCourseFaild());
  }
};

export default courseSlice.reducer;
