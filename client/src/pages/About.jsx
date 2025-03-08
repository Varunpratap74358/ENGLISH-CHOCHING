import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800 py-16 px-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-600 mb-4">About British Academy</h2>
          <p className="text-lg text-gray-700">
            At British Academy, we aim to inspire and empower students to achieve their
            academic and personal goals. Our dedicated faculty and state-of-the-art
            facilities ensure a supportive and enriching environment for every learner.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div>
            <img
              src="https://logos-download.com/wp-content/uploads/2019/06/British_Academy_Logo_old.png"
              alt="About British Academy"
              className="rounded-lg shadow-lg w-[90%] h-72"
            />
          </div>

          {/* Text Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="bg-green-600 text-white rounded-full p-2 mr-3">
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
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Expert faculty with years of experience
              </li>
              <li className="flex items-center">
                <span className="bg-green-600 text-white rounded-full p-2 mr-3">
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
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Personalized learning approach
              </li>
              <li className="flex items-center">
                <span className="bg-green-600 text-white rounded-full p-2 mr-3">
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
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Wide range of courses and programs
              </li>
              <li className="flex items-center">
                <span className="bg-green-600 text-white rounded-full p-2 mr-3">
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
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Supportive and nurturing environment
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center mb-6">Our Mission</h3>
          <p className="text-lg text-gray-700 text-center">
            Our mission is to provide high-quality education and empower students with the knowledge,
            skills, and confidence to excel in their chosen fields. At British Academy, we believe
            in fostering a culture of lifelong learning and academic excellence.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link to={'/teacher/profile'} className="bg-green-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
