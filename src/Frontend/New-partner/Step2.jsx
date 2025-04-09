import React, { useState } from "react";
import NavbarPartner from "./NavbarPartner";
import { ConciergeBell, ClipboardList, ShieldCheck, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Step2 = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  const convertToAMPM = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const h = parseInt(hour);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12) + 1; // Convert 24hr to 12hr format
    return `${hour12}:${minute} ${suffix}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const menuItems = [];
  
    for (let i = 0; i < count; i++) {
      const name = form[`itemName${i}`]?.value;
      const price = form[`itemPrice${i}`]?.value;
      const category = form[`itemCategory${i}`]?.value;
      const image = form[`itemImage${i}`]?.files?.[0];
  
      if (name && price && category) {
        menuItems.push({ name, price, category, image });
      }
    }
  
    const openDays = Array.from(form.openDays)
      .filter(day => day.checked && day.value) // 🔥 Explicit check
      .map(day => day.value);

      if (openDays.length === 0) {
        alert("Select at least one open day!");
        return;
      }
  
    const operationalData = {
      openTime: convertToAMPM(form.openTime.value),
      closeTime: convertToAMPM(form.closeTime.value),
      openDays, // store the days as an array
      menuItems,
    };
  
    try {
      localStorage.setItem("restaurantStep2", JSON.stringify(operationalData));
      navigate("/new-partner/step3");
    } catch (err) {
      console.error("Error saving step2 to localStorage:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="bg-gray-100">
      <NavbarPartner />
      <form
        onSubmit={handleSubmit}
        className="mt-16.5 md:mt-21.5 pt-10 pb-30 w-full"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="flex flex-row justify-center items-start px-10 lg:px-25 xl:px-45 2xl:px-55">
          <div className="hidden md:block md:flex-[35%] mr-3.5 bg-white h-fit rounded-lg pt-3">
            <div className="border-b-1 border-gray-200 px-3 pb-4 mb-3">
              <h4 className="text-xl font-semibold">
                Complete your registration
              </h4>
            </div>
            <div className="flex items-center px-4 mb-5">
              <div className="bg-green-300 border-3 border-green-600 rounded-[50%] p-1.5 mr-2.5">
                <ConciergeBell size={35} color="yellow" />
              </div>
              <p>Restaurant information</p>
            </div>
            <div className="flex items-center px-3 mb-5 border-l-4 border-red-400">
              <div className="bg-red-300 border-3 border-red-600 rounded-[50%] p-1.5 mr-2.5">
                <ClipboardList size={35} color="yellow" />
              </div>
              <p>Menu and operational details</p>
            </div>
            <div className="flex items-center px-4 mb-5">
              <div className="bg-gray-300 border-3 border-gray-600 rounded-[50%] p-1.5 mr-2.5">
                <ShieldCheck size={35} />
              </div>
              <p>Restaurant documents</p>
            </div>
          </div>

          <div className="flex-1 md:flex-[65%] ml-3.5">
            <h1 className="text-4xl font-bold mb-8">
              Menu and Operational Details
            </h1>

            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">Add Menu</h3>
                <p className="text-sm text-gray-400">
                  This will be used to create your in-app menu for online
                  ordering
                </p>
              </div>
              <div className="flex flex-col items-center">
                {Array.from({ length: count }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full px-5 flex flex-wrap mb-4 border-b-1 border-gray-200 py-4 items-center"
                  >
                    <input
                      type="text"
                      name={`itemName${index}`}
                      placeholder="Item name*"
                      required
                      className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm"
                    />
                    <div className="flex items-center w-full mt-2.5 mb-1.5">
                      <input
                        type="number"
                        name={`itemPrice${index}`}
                        required
                        placeholder="Price*"
                        className="w-[50%] outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mr-1.5"
                      />
                      <select
                        id="car"
                        name={`itemCategory${index}`}
                        className="w-[50%] outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm ml-1.5"
                      >
                        <option value="Veg">Veg</option>
                        <option value="Non Veg">Non Veg</option>
                      </select>
                    </div>
                    <input
                      type="file"
                      name={`itemImage${index}`}
                      accept="image/*"
                      className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 file:cursor-pointer mt-1.5"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className="rounded-[50%] p-1.5 bg-gray-100 cursor-pointer hover:bg-gray-300"
                  onClick={() => setCount(count + 1)}
                >
                  <Plus color="red" size={30} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">
                  Restaurant Delivery Timings
                </h3>
              </div>
              <div className="flex mb-4 px-5">
                <div className="w-1/2 mr-1.5">
                  <p className="font-semibold">Open time*</p>
                  <input
                    type="time"
                    name="openTime"
                    required
                    className="w-full shadow-sm outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 mb-4"
                  />
                </div>
                <div className="w-1/2 ml-1.5">
                  <p className="font-semibold">Close time*</p>
                  <input
                    type="time"
                    name="closeTime"
                    required
                    className="w-full shadow-sm outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 mb-4"
                  />
                </div>
              </div>

              <div className="">
                <div className="border-b-1 border-gray-200 px-5 pb-2 mb-3">
                  <h3 className="font-semibold">Mark open days</h3>
                  <p className="text-xs text-gray-400">
                    EpicEatz will use these details for all business
                    communications and updates
                  </p>
                </div>
                <div className="flex flex-wrap justify-start px-5">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <label
                      key={day}
                      className="flex shadow-sm border-1 border-gray-200 rounded-lg py-2.5 px-2 mb-4 text-xs mr-2 font-semibold"
                    >
                      <input
                        type="checkbox"
                        name="openDays"
                        value={day}
                        className="mr-1"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end px-5 fixed bottom-0 left-0 bg-white py-4">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
