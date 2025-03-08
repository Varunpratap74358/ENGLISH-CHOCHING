import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateDetail, updateProfilePhoto } from "../store/slice/userSlice";
import loadingImg from "../../public/kOnzy.gif"

const TeacherProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(user);
  const isTeacher = localStorage.getItem("isTeacher");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  // console.log(user)

  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelUpdateDetailHandler = async(e) => {
    e.preventDefault();
    await dispatch(updateDetail(formData));
    setIsModalOpen(false);
  };

  //handel image profile photo change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData()
      formData.append("file",file)
      dispatch(updateProfilePhoto(formData))
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center md:py-20 py-8 mt-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 text-center">
        {/* Profile Picture */}
        {isTeacher && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-500 py-1 px-4 rounded my-2 font-semibold relative md:right-[-300px] right-[-100px]"
          >
            Update Profile
          </button>
        )}
        <div className="w-28 h-28 mx-auto mb-4 relative">
          {/* Image */}
          <img
            src={loading ? loadingImg : user?.profileImage?.url}
            alt="Profile"
            className="w-full h-full rounded-full border-4 border-blue-500 object-cover p-3 cursor-pointer hover:bg-black"
            onClick={() => document.getElementById("fileInput").click()}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e)}
          />
        </div>

        {/* User Information */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{user?.name}</h1>
        <p className="text-gray-600 mb-4">Teacher</p>
        <p className="text-sm text-gray-500 mb-6">
          Hello! My name is{" "}
          <span className="font-semibold text-green-600">{user.name}</span>, and
          I am a passionate and dedicated English teacher with{" "}
          <span className="font-semibold text-green-600">10 years</span> of
          experience helping students master the beauty and power of the English
          language. My teaching philosophy centers on creating an engaging,
          interactive, and supportive learning environment where students feel
          confident to express themselves and achieve their full potential
        </p>
      </div>

      {/* Contact Details */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Contact Information
        </h2>
        <ul className="text-left">
          <li className="mb-2">
            <strong className="text-gray-600">Email:</strong> {user?.email}
          </li>
          <li className="mb-2">
            <strong className="text-gray-600">Phone:</strong> {user?.phone}
          </li>
          <li>
            <strong className="text-gray-600">Location:</strong> {user?.address}
          </li>
        </ul>
      </div>

      {/* teacher skills */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Skills and Expertise
        </h2>
        <ul className="text-left">
          <li className="mb-2">
            <strong className="text-slate-600 font-semibold">
              Proficient in teaching grammar, vocabulary, and writing
              techniques.
            </strong>
          </li>
          <li className="mb-2">
            <strong className="text-slate-600 font-semibold">
              Expertise in literature analysis and fostering critical thinking.
            </strong>
          </li>
          <li>
            <strong className="text-slate-600 font-semibold">
              Skilled in enhancing spoken English and communication skills.
            </strong>
          </li>
          <li>
            <strong className="text-slate-600 font-semibold">
              Tailoring lessons to individual needs for academic and personal
              growth.
            </strong>
          </li>
        </ul>
      </div>

      {/* Teaching Approach */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          What I Say
        </h2>
        <ul className="text-left">
          <li className="mb-2">
            <strong className="text-slate-600 font-semibold">
              I believe that learning English is not just about understanding
              grammar or memorizing vocabulary but also about discovering new
              ways to express ideas and connect with the world. Through creative
              lessons, practical exercises, and meaningful discussions, I aim to
              make every class enjoyable and impactful.
            </strong>
          </li>
        </ul>
      </div>

      {/* WHAT I OFFER */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">What I Offer</h2>
        <ul className="text-left">
          <li className="mb-2">
            <strong className="text-slate-600 font-semibold">
              Personalized lessons for all levels, from beginners to advanced
              learners.
            </strong>
          </li>
          <li className="mb-2">
            <strong className="text-slate-600 font-semibold">
              Assistance with essay writing, exam preparation, and public
              speaking.
            </strong>
          </li>
          <li className="mb-2">
            <strong className="text-slate-600 font-semibold">
              A nurturing space to build confidence and fluency in English.
            </strong>
          </li>
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(18,17,17,0.71)] z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Update Profile
            </h2>
            <form onSubmit={handelUpdateDetailHandler}>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                name="name"
                onChange={handelChange}
                className="w-full border rounded p-2 mb-2"
              />

              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                name="email"
                onChange={handelChange}
                className="w-full border rounded p-2 mb-2"
              />

              <label className="block text-gray-600">Phone</label>
              <input
                type="text"
                defaultValue={user?.phone}
                name="phone"
                onChange={handelChange}
                className="w-full border rounded p-2 mb-2"
              />

              <label className="block text-gray-600">Address</label>
              <input
                type="text"
                defaultValue={user?.address}
                name="address"
                onChange={handelChange}
                className="w-full border rounded p-2 mb-4"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-1 px-4 rounded mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  {
                    loading ? "Saving..." : "Save"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
