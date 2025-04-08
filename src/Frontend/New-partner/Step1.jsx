import React, { useState } from "react";
import NavbarPartner from "./NavbarPartner";
import { ConciergeBell, ClipboardList, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Step1 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    restaurantName: "",
    fullName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pin: ""
    },
    city: "",
    pin: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.address) {
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      localStorage.setItem("restaurantStep1", JSON.stringify(form));
      navigate("/new-partner/step2");
    } catch (err) {
      console.error("Error saving step1 to localStorage:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-gray-100">
      <NavbarPartner />

      <form
        onSubmit={handleSubmit}
        className="mt-16.5 md:mt-21.5 pt-10 pb-30 w-full"
      >
        <div className="flex flex-row justify-center items-start px-10 lg:px-25 xl:px-45 2xl:px-55">
          {/* Sidebar */}
          <div className="hidden md:block md:flex-[35%] mr-3.5 bg-white h-fit rounded-lg pt-3">
            <div className="border-b-1 border-gray-200 px-3 pb-4 mb-3">
              <h4 className="text-xl font-semibold">
                Complete your registration
              </h4>
            </div>
            <div className="flex items-center px-3 border-l-4 border-red-400 mb-5">
              <div className="bg-red-300 border-3 border-red-600 rounded-full p-1.5 mr-2.5">
                <ConciergeBell size={35} color="yellow" />
              </div>
              <p>Restaurant information</p>
            </div>
            <div className="flex items-center px-4 mb-5">
              <div className="bg-gray-300 border-3 border-gray-600 rounded-full p-1.5 mr-2.5">
                <ClipboardList size={35} />
              </div>
              <p>Menu and operational details</p>
            </div>
            <div className="flex items-center px-4 mb-5">
              <div className="bg-gray-300 border-3 border-gray-600 rounded-full p-1.5 mr-2.5">
                <ShieldCheck size={35} />
              </div>
              <p>Restaurant documents</p>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 md:flex-[65%] ml-3.5">
            <h1 className="text-4xl font-bold mb-8">Restaurant Information</h1>

            {/* Restaurant Name */}
            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">Restaurant Name</h3>
                <p className="text-sm text-gray-400">
                  Customers will see this name on EpicEatz
                </p>
              </div>
              <div className="px-5">
                <input
                  type="text"
                  name="restaurantName"
                  value={form.restaurantName}
                  onChange={handleChange}
                  placeholder="Restaurant name*"
                  required
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm"
                />
              </div>
            </div>

            {/* Owner Details */}
            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">Owner Details</h3>
                <p className="text-sm text-gray-400">
                  EpicEatz will use these details for all business
                  communications and updates
                </p>
              </div>
              <div className="px-6">
                <div className="flex mb-4">
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full name*"
                    required
                    className="w-[50%] outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 mr-1.5 shadow-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address*"
                    required
                    className="w-[50%] outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 ml-1.5 shadow-sm"
                  />
                </div>
                <div className="flex">
                  <div className="flex items-center rounded-lg border-1 border-gray-200 w-25 justify-center mr-1.5 shadow-sm">
                    <img src="/india.png" className="h-6 w-auto mr-1.5" />
                    <p>+91</p>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number*"
                    required
                    className="flex-grow outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 ml-1.5 shadow-sm"
                  />
                </div>
              </div>
            </div>

           {/* Address Details */}
            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">Address Details</h3>
                <p className="text-sm text-gray-400">
                  We’ll verify your location to serve customers better.
                </p>
              </div>
              <div className="px-6">
                {/* Street Address */}
                <input
                  type="text"
                  name="street"  // Changed from "address" to "street"
                  value={form.address.street}  // Now using form.address.street
                  onChange={handleChange}
                  placeholder="Full address*"
                  required
                  className="w-full mb-4 outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm"
                />
                
                <div className="flex mb-4">
                  {/* City */}
                  <input
                    type="text"
                    name="city"  // Changed name to "city"
                    value={form.address.city}  // Now using form.address.city
                    onChange={handleChange}
                    placeholder="City*"
                    required
                    className="w-1/2 mr-2 outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm"
                  />
                  
                  {/* State */}
                  <input
                    type="text"
                    name="state"  // Changed name to "state"
                    value={form.address.state}  // Now using form.address.state
                    onChange={handleChange}
                    placeholder="State*"
                    required
                    className="w-1/2 ml-2 outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm"
                  />
                </div>
                
                {/* Pincode */}
                <input
                  type="text"
                  name="pin"  // Changed name to "pin"
                  value={form.address.pin}  // Now using form.address.pin
                  onChange={handleChange}
                  placeholder="Pincode*"
                  required
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm"
                />
              </div>
            </div>


            <div className="w-full flex justify-end px-5 fixed bottom-0 left-0 bg-white py-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 cursor-pointer transition-all"
              >
                {loading ? "Submitting..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step1;
