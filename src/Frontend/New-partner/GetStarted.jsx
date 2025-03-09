import React from "react";
import Footer from "../Footer";
import { NavLink } from "react-router-dom";
import { UsersRound, MailCheck, PackageOpen } from "lucide-react";

const GetStarted = () => {
  return (
    <div>
      <div className="w-full h-90 md:h-115 lg:h-125 bg-cover bg-[url(/delivery.jpeg)] opacity-80 overflow-hidden">
        <div className="flex flex-col items-start w-max-50">
          <NavLink to="/">
            <img src="/EpicEatz_logo.png" alt="Logo" className="h-35 md:h-40" />
          </NavLink>
          <div className="flex flex-row items-start text-white font-extralight mt-[-20px] ml-3">
            <p className="text-white font-medium text-sm mx-2">
              PARTNER WITH EPICEATZ!
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-40 md:mt-57 lg:mt-66">
          <NavLink
            to="/new-partner/step1"
            className="text-sm md:text-xl text-white bg-blue-600 py-3 px-5 z-30 rounded-xl text-center"
          >
            Register your Restaurant
          </NavLink>
        </div>
      </div>

      <div className="mt-16 md:mt-24 flex flex-col items-center w-full">
        <div className="flex items-center justify-center w-full max-w-[90%] lg:max-w-[82%] font-bold">
          <div className="w-full h-[2px] bg-gray-600"></div>
          <span className="mx-3 sm:mx-4 md:mx-7 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center whitespace-nowrap text-gray-800">
            Why partner with EpicEatz?
          </span>
          <div className="w-full h-[2px] bg-gray-600"></div>
        </div>

        <div className="mt-7 text-gray-600">
          <div className="flex flex-col items-center mt-10 mb-12 md:mt-15">
            <UsersRound
              className="h-18 w-18 md:h-25 md:w-25"
              color="#1E88F2"
              fill="#1E88F2"
              fillOpacity={0.4}
            />
            <h1 className="text-lg md:text-xl font-bold">
              Attract new customers
            </h1>
            <p className="text-center">
              Reach the millions of people ordering on EpicEatz
            </p>
          </div>
          <div className="flex flex-col items-center mt-10 mb-12 md:mt-15">
            <PackageOpen
              className="h-18 w-18 md:h-25 md:w-25"
              color="#1E88F2"
              fill="#1E88F2"
              fillOpacity={0.4}
            />
            <h1 className="text-lg md:text-xl font-bold">
              Doorstep delivery convenience
            </h1>
            <p className="text-center">
              Easily get your orders delivered through our trained delivery
              partners
            </p>
          </div>
          <div className="flex flex-col items-center mt-10 mb-12 md:mt-15">
            <MailCheck
              className="h-18 w-18 md:h-25 md:w-25"
              color="#1E88F2"
              fill="#1E88F2"
              fillOpacity={0.4}
            />
            <h1 className="text-lg md:text-xl font-bold">Onboarding support</h1>
            <p className="text-center">
              For any support, email us at merchantonboarding@epiceatz.com
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 md:mt-5 sm:hidden text-center">
        <NavLink
          to="/new-partner/step1"
          className="text-sm sm:text-xl text-white bg-blue-500 py-3 px-5 z-30 rounded-xl text-center"
        >
          Get Started
        </NavLink>
      </div>

      <Footer />
    </div>
  );
};

export default GetStarted;
