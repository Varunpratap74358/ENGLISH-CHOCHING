import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutFunction } from "../store/slice/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {  loading } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  let isTeacher = localStorage.getItem("isTeacher")
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = ()=>{
    dispatch(logoutFunction())
    // alert(isTeacher)
  }

  useEffect(()=>{
    isTeacher = localStorage.getItem('isTeacher')
  },[dispatch,loading])
  return (
    <nav className="bg-blue-700 text-white shadow-md fixed top-0 left-0 right-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src="https://c8.alamy.com/comp/2H7C97W/ba-logo-design-premium-letter-ba-logo-design-with-water-wave-concept-2H7C97W.jpg"
            alt="Bitrix Academy Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-2xl font-bold">BRITISH ACADEMY</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 font-medium">
          <li>
            <Link
              to={""}
              className="hover:text-blue-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to={"/subjects"}
              className="hover:text-blue-300 transition-colors duration-300"
            >
              Subjects
            </Link>
          </li>
          <li>
            <Link
              to={"/events"}
              className="hover:text-blue-300 transition-colors duration-300"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to={"/teacher/profile"}
              className="hover:text-blue-300 transition-colors duration-300 font-extrabold"
            >
              About Teacher
            </Link>
          </li>
          <li>
            <>
              {isTeacher ? (
                <button
                onClick={logoutHandler}
                  className="hover:text-blue-300 cursor-pointer transition-colors duration-300 font-extrabold"
                >
                  {
                    loading ? "Logout..." : "Logout"
                  }
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="hover:text-blue-300 transition-colors duration-300 font-extrabold"
                >
                  Login
                </Link>
              )}
            </>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-blue-700 text-white w-64 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-4">
          <button
            className="text-white focus:outline-none mb-4"
            aria-label="Close Menu"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="space-y-4">
            <li>
              <Link
                to={""}
                className="hover:text-blue-300 transition-colors duration-300 block"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to={"/subjects"}
                className="hover:text-blue-300 transition-colors duration-300 block"
                onClick={toggleMenu}
              >
                Subjects
              </Link>
            </li>
            <li>
              <Link
                to={"/events"}
                className="hover:text-blue-300 transition-colors duration-300 block"
                onClick={toggleMenu}
              >
                Events
              </Link>
            </li>

            <li>
              <Link
                to={"/teacher/profile"}
                className="hover:text-blue-300 transition-colors duration-300 block"
                onClick={toggleMenu}
              >
                About Teacher
              </Link>
            </li>

            <li>
            <>
              {isTeacher ? (
                <button
                onClick={logoutHandler}
                  className="hover:text-blue-300 cursor-pointer transition-colors duration-300 font-extrabold"
                >
                  {
                    loading ? "Logout..." : "Logout"
                  }
                </button>
              ) : (
                <Link
                  to={"/login"}
                  onClick={toggleMenu}
                  className="hover:text-blue-300 transition-colors duration-300 font-extrabold"
                >
                  Login
                </Link>
              )}
            </>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
