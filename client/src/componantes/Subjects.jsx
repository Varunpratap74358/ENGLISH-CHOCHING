import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCourse, deleteCourse, getAllSubjects } from "../store/slice/courseSlice";

const Subjects = () => {
  const { loading, courses } = useSelector((state) => state.course);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectImage, setNewSubjectImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSubjectImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isTeacher = localStorage.getItem("isTeacher");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (newSubjectName && newSubjectImage) {
      const formData = new FormData();
      formData.append("subjectName", newSubjectName);
      formData.append("file", newSubjectImage);
      await dispatch(AddCourse(formData));
      setNewSubjectName("");
      setNewSubjectImage(null);
      setImagePreview("");
    }
  };


  const deleteCourseHandler=(id)=>{
    dispatch(deleteCourse(id))
    // alert(id)
  }
  // console.log(loading)

  

  useEffect(() => {
    dispatch(getAllSubjects());
    // console.log("ello")
  }, [loading, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4 py-20">
      {/* Existing Subjects List */}
      <div className="mb-8">
        <h2 className="text-2xl underline font-bold mb-4">Subjects :)</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {courses.map((subject, index) => (
            <div key={index} className="border rounded-lg shadow-md p-4 flex flex-col items-center">
              {subject?.subjectImage?.url ? (
                <img
                  src={subject.subjectImage.url}
                  className="w-52 h-52 object-cover rounded-md"
                  alt={subject.subjectName || "Subject"}
                />
              ) : (
                <div className="w-52 h-52 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <h3 className="py-2 font-semibold text-start">{subject?.subjectName}</h3>
              {isTeacher && (
                <button onClick={()=>deleteCourseHandler(subject._id)} className="text-center cursor-pointer bg-red-500 w-full py-2 mb-2 rounded-md text-white font-semibold hover:bg-red-600 transition-all duration-300">
                  Delete
                </button>
              )}
            </div>
          ))}
        </ul>
      </div>

      {/* Add New Subject Form */}
      {
        isTeacher && <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-4">Add New Subject</h3>

        <div className="mb-4">
          <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
            placeholder="Enter subject name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subjectImage" className="block text-sm font-medium text-gray-700">
            Subject Image
          </label>
          <input
            type="file"
            id="subjectImage"
            onChange={handleImageChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            accept="image/*"
            required
          />
        </div>

        {imagePreview && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Image Preview</p>
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-2 w-full h-36 object-cover rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
        >
          {loading ? "Adding..." : "Add Subject"}
        </button>
      </form>
      }
    </div>
  );
};

export default Subjects;
