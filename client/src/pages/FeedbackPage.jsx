import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const FeedbackPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    feedback: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        "service_rth4yin",
        "template_pngwms9",
        formData,
        "5lr6UpNU7hDZhG9Dz"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setError("");
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "",phone:"" });
        setLoading(false);
        toast.success("Message sent successfully");
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setError("Failed to send message. Please try again later.");
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-100 py-16  w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Feedback Form
          </h2>
          <p className="text-lg text-gray-700">
            We value your feedback! Please fill out the form below to share your
            thoughts and help us improve.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8 max-w-[70%] mx-auto">
          {isSubmitted ? (
            <div className="text-center text-green-600">
              Thank you! Your message has been sent successfully.
            </div>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={changeHandler}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  onChange={changeHandler}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="feedback"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  onChange={changeHandler}
                  rows="4"
                  placeholder="Enter your feedback"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700"
                >
                  {loading ? "Sending..." : "Submit Feedback"}
                </button>
              </div>
              {error && (
                <div className="text-center text-red-500 mt-4">{error}</div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
