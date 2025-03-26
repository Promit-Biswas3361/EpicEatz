import React from "react";
import Navbar from "../Navbar";
import { Dot } from "lucide-react";
import SidePanel from "./SidePanel";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Navbar />

      <div className="mt-35 py-12 w-[88%] ">
        <div className="mb-8">
          <p className="text-3xl font-bold">Username</p>
          <div className="flex items-center mt-1">
            <p className="text-lg font-light">Mobile Number</p>
            <Dot />
            <p className="text-lg font-light">Email ID</p>
          </div>
        </div>

        <div className="bg-white sm:flex max-sm:pb-5 pt-8 px-8">
          <div className="bg-gray-200 z-40 max-sm:mb-10">
            <SidePanel />
          </div>
          <div className="sm:ml-5 md:ml-10 xl:ml-15 sm:mr-6 md:mr-10 flex-grow">
            <Outlet />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
