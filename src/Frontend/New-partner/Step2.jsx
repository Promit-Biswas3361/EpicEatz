import React, { useState } from "react";
import NavbarPartner from "./NavbarPartner";
import { ConciergeBell, ClipboardList, ShieldCheck, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step2 = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  return (
    <div className="bg-gray-100">
      <NavbarPartner />

      <form
        action={() => navigate("/new-partner/step3")}
        className="mt-16.5 md:mt-21.5 pt-10 pb-30 w-full"
        method="POST"
        enctype="multipart/form-data"
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
                      placeholder="Item name*"
                      required
                      className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-blue-400 hover:text-blue-600 cursor-pointer"
                    />
                  </div>
                ))}

                <button
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
              <div className="">
                <div className="flex mb-4 px-5">
                  <div className="w-1/2 mr-1.5">
                    <p className="font-semibold">Open time</p>
                    <input
                      type="time"
                      required
                      className="w-full shadow-sm outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 mb-4"
                    />
                  </div>
                  <div className="w-1/2 ml-1.5">
                    <p className="font-semibold">Close time</p>
                    <input
                      type="time"
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
                    <label className="flex shadow-sm border-1 border-gray-200 rounded-lg py-2.5 px-2 mb-4 text-xs mr-2 font-semibold">
                      <input
                        type="checkbox"
                        name="Monday"
                        value="Monday"
                        className="mr-1"
                      />
                      Monday
                    </label>
                    <label className="flex shadow-sm border-1 border-gray-200 rounded-lg py-2.5 px-2 mb-4 text-xs mr-2 font-semibold">
                      <input
                        type="checkbox"
                        name="Tuesday"
                        value="Tuesday"
                        className="mr-1"
                      />
                      Tuesday
                    </label>
                    <label className="flex shadow-sm border-1 border-gray-200 rounded-lg py-2.5 px-2 mb-4 text-xs mr-2 font-semibold">
                      <input
                        type="checkbox"
                        name="Wednesday"
                        value="Wednesday"
                        className="mr-1"
                      />
                      Wednesday
                    </label>
                    <label className="flex shadow-sm border-1 border-gray-200 rounded-lg py-2.5 px-2 mb-4 text-xs mr-2 font-semibold">
                      <input
                        type="checkbox"
                        name="Thursday"
                        value="Thursday"
                        className="mr-1"
                      />
                      Thursday
                    </label>
                    <label className="flex shadow-sm border-1 border-gray-200 rounded-lg py-2.5 px-2 mb-4 text-xs mr-2 font-semibold">
                      <input
                        type="checkbox"
                        name="Friday"
                        value="Friday"
                        className="mr-1"
                      />
                      Friday
                    </label>
                    <label className="flex shadow-sm border-1 border-gray-200 rounded-lg py-2.5 px-2 mb-4 text-xs mr-2 font-semibold">
                      <input
                        type="checkbox"
                        name="Saturday"
                        value="Saturday"
                        className="mr-1"
                      />
                      Saturday
                    </label>
                    <label className="flex shadow-sm border-1 border-gray-200 rounded-lg py-2.5 px-2 mb-4 text-xs font-semibold">
                      <input
                        type="checkbox"
                        name="Sunday"
                        value="Sunday"
                        className="mr-1"
                      />
                      Sunday
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full bg-white fixed bottom-0 py-5 px-4 z-20">
          <div className="flex justify-end">
            <input
              type="submit"
              value="Next"
              className="bg-[#F22400] rounded-xl px-7 py-2 text-white font-semibold cursor-pointer"
            />
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Step2;
