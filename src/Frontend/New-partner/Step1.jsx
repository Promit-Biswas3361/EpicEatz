import React from "react";
import NavbarPartner from "./NavbarPartner";
import FooterPartner from "./FooterPartner";
import { ConciergeBell, ClipboardList, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      <NavbarPartner />

      <form className="mt-16.5 md:mt-21.5 pt-10 pb-30 w-full">
        <div className="flex flex-row justify-center items-start px-10 lg:px-25 xl:px-45 2xl:px-55">
          <div className="hidden md:block flex-[35%] mr-3.5 bg-white h-fit rounded-lg pt-3">
            <div className="border-b-1 border-gray-200 px-3 pb-4 mb-3">
              <h4 className="text-xl font-semibold">
                Complete your registration
              </h4>
            </div>
            <div className="flex items-center px-3 border-l-4 border-red-400 mb-5">
              <div className="bg-gray-300 rounded-[50%] p-1.5 mr-2.5">
                <ConciergeBell size={35} color="gold" />
              </div>
              <p>Restaurant information</p>
            </div>
            <div className="flex items-center px-4 mb-5">
              <div className="bg-gray-300 rounded-[50%] p-1.5 mr-2.5">
                <ClipboardList size={35} />
              </div>
              <p>Menu and operational details</p>
            </div>
            <div className="flex items-center px-4 mb-5">
              <div className="bg-gray-300 rounded-[50%] p-1.5 mr-2.5">
                <ShieldCheck size={35} />
              </div>
              <p>Submit</p>
            </div>
          </div>

          <div className="flex-[65%] ml-3.5">
            <h1 className="text-4xl font-bold mb-8">Restaurant Information</h1>

            <div className="bg-white rounded-lg mb-8 py-6 px-">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">Restaurant Name</h3>
                <p className="text-sm text-gray-400">
                  Customers will see this name on EpicEatz
                </p>
              </div>
              <div className="px-5">
                <input
                  type="text"
                  placeholder="Restaurant name*"
                  required
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm"
                />
              </div>
            </div>

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
                    placeholder="Full name*"
                    required
                    className="w-[50%] outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 mr-1.5 shadow-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email address*"
                    required
                    className="w-[50%] outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 ml-1.5 shadow-sm"
                  />
                </div>
                <div className="flex">
                  <div className="flex items-center rounded-lg border-1 border-gray-200 w-25 justify-center mr-1.5 shadow-sm">
                    <img src="/india.png" alt="" className="h-6 w-auto" />
                    <p>+91</p>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    className="flex-grow outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 ml-1.5 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">
                  Restaurant Address Details
                </h3>
                <p className="text-sm text-gray-400">
                  Address details are basis the restaurant location mentioned
                  above
                </p>
              </div>
              <div className="px-5">
                <input
                  type="text"
                  placeholder="Restaurant address*"
                  required
                  className="w-full shadow-sm outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 mb-4"
                />
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="City*"
                    required
                    className="w-[50%] shadow-sm outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 mr-1.5"
                  />
                  <input
                    type="text"
                    placeholder="PIN code*"
                    required
                    pattern="[0-9]{6}"
                    className="w-[50%] shadow-sm outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 ml-1.5"
                  />
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="State*"
                    required
                    className="w-[50%] outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 mr-1.5 shadow-sm"
                  />
                  <input
                    type="text"
                    value="India"
                    readOnly
                    className="w-[50%] outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 ml-1.5 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full bg-white fixed bottom-0 py-5 px-4 z-20">
          <div className="flex justify-end">
            <button
              className="bg-[#F22400] rounded-xl px-7 py-2 text-white font-semibold cursor-pointer"
              onClick={() => navigate("/new-partner/step2")}
            >
              Next
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Step1;
