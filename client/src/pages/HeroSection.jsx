import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-20 px-10 h-screen flex">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center ">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-16">Welcome to British Academy</h1>
          <p className="text-lg md:text-xl mb-6">
            Achieve academic excellence with our expert guidance and comprehensive learning programs.
           <br></br> If you want to learn somthing new you can join this academy.
          </p>
          {/* <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100">
            Discover More
          </button> */}
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <img
            src="https://britishacademy.co.za/wp-content/uploads/2018/03/tba-logo-2.png"
            alt="Hero Image for British Academy"
            className="rounded-lg shadow-lg h-[100%] w-[90%] mt-10"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;