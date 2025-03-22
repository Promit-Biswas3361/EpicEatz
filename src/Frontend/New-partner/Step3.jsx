import React from "react";
import NavbarPartner from "./NavbarPartner";
import { ConciergeBell, ClipboardList, ShieldCheck, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100">
      <NavbarPartner />

      <form
        action={() => navigate("/")}
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
            <div className="flex items-center px-4 mb-5">
              <div className="bg-green-300 border-3 border-green-600 rounded-[50%] p-1.5 mr-2.5">
                <ClipboardList size={35} color="yellow" />
              </div>
              <p>Menu and operational details</p>
            </div>
            <div className="flex items-center px-3 mb-5 border-l-4 border-red-400">
              <div className="bg-red-300 border-3 border-red-600 rounded-[50%] p-1.5 mr-2.5">
                <ShieldCheck size={35} color="yellow" />
              </div>
              <p>Restaurant Documents</p>
            </div>
          </div>

          <div className="flex-1 md:flex-[65%] ml-3.5">
            <h1 className="text-4xl font-bold mb-8">Restaurant Documents</h1>

            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">Official Documents</h3>
                <p className="text-sm text-gray-400">
                  Necessary legal and formal documents required for processing
                  and validation.
                </p>
              </div>
              <div className="px-5">
                <input
                  type="text"
                  placeholder="Business/Owner PAN*"
                  required
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mb-4"
                />
                <input
                  type="text"
                  placeholder="Bank IFSC code*"
                  required
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mb-4"
                />
                <input
                  type="text"
                  placeholder="Bank Account number*"
                  required
                  pattern="[0-9]*"
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mb-3"
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full bg-white fixed bottom-0 py-5 px-4 z-20">
          <div className="flex justify-end">
            <input
              type="submit"
              value="Submit"
              className="bg-[#F22400] rounded-xl px-7 py-2 text-white font-semibold cursor-pointer"
            />
          </div>
        </footer>
      </form>
    </div>
  );
};

export default Step3;
