import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getAllevents, uplodEvent } from "../store/slice/eventSlice";
import { Link, useNavigate } from "react-router-dom";

const EventsPage = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, events } = useSelector((state) => state.event);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTeacher = localStorage.getItem("isTeacher");
  const [file, setFile] = useState("");
  const [prewFile, setPrewFile] = useState("");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    discription: "",
  });

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelEventImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFile(file);
      setPrewFile(reader.result);
    };
  };

  const handelEventHandler = async (e) => {
    e.preventDefault();
    const formDataa = new FormData();
    formDataa.append("discription", formData.discription);
    formDataa.append("file", file);
    await dispatch(uplodEvent(formDataa));
    setIsModalOpen(false);
  };


  const handelDeleteEventHandler=(id)=>{
    dispatch(deleteEvent(id))
  }



  useEffect(()=>{
    dispatch(getAllevents())
  },[dispatch,loading])

  return (
    <div className="max-w-6xl mx-auto p-6 py-20">
      {isTeacher && (
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Add Event
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {events.map((v, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <img
              src={v?.eventImage?.url}
              className="w-full h-72 object-cover"
              alt="event pic"
            />
            <Link to={`/event/${v._id}`} className="p-4 bg-white">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Date: </span>
                {v.createdAt.substr(0, 10)}
              </p>
              <p  className="font-semibold text-lg text-gray-800 mt-2">
                {v?.discription.substr(0, 35) + "......"}
              </p>
            </Link>
            {isTeacher && (
              <div className="p-3 flex justify-end">
                <button onClick={()=>handelDeleteEventHandler(v._id)} className="bg-red-500 text-white py-2 px-6 rounded cursor-pointer hover:bg-red-600">
                  {
                    loading ? "Deleting..." : "Delete"
                  }
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Add New Event
            </h2>
            <form onSubmit={handelEventHandler}>
              <label className="block text-gray-600 font-medium">
                Description
              </label>
              <textarea
  name="description"
  placeholder="Write description for event"
  onChange={handelChange}
  onInput={(e) => {
    e.target.style.height = "auto"; // Pehle height reset karega
    e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`; // Max height 500px tak hi rahegi
  }}
  className="w-full border rounded p-2 mt-1 mb-3 resize-none overflow-auto"
  style={{ maxHeight: "300px" }} // CSS se bhi max-height set kar rahe hain
/>

              {prewFile && (
                <div className="flex justify-center">
                  <img
                    src={prewFile}
                    alt="event preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              <label className="block text-gray-600 font-medium mt-3">
                File
              </label>
              <input
                type="file"
                className="w-full border rounded p-2 mb-3"
                onChange={handelEventImage}
              />

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-1 px-4 rounded mr-2 hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition-all duration-300"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
