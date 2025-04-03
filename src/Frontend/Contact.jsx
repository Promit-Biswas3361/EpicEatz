import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center bg-gray-100 px-5 py-15 mt-35 mb-[-110px]">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-5 text-center">Contact Us</h2>
          {submitted ? (
            <div className="flex flex-col items-center">
              <p className="text-green-600 text-center mb-4">
                ✅ Thank you! Your message has been sent.
              </p>

              <button
                className="bg-yellow-400 w-fit px-4 py-2 rounded-lg cursor-pointer text-white font-semibold"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 cursor-pointer text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
