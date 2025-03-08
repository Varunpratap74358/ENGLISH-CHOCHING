import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

  // Redirect to the homepage


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <p className="text-lg text-gray-500 mb-6">
          The page you're looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
            to={'/'}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
