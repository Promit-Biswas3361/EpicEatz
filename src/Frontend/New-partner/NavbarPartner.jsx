import React from "react";
import { Link } from "react-router-dom";

const NavbarPartner = () => {
  return (
    <div className="w-full flex items-center justify-evenly bg-white z-20 fixed top-0 pb-2 shadow-xl">
      <div className="flex flex-col">
        <Link
          to="/new-partner/get-started"
          className="text-4xl md:text-5xl font-bold text-[#FF2400]"
        >
          EpicEatz
        </Link>
        <div className="flex items-center w-full max-w-[100%] text-[9.5px] md:text-[13.2px] text-gray-800 mt-1 md:mt-2.5">
          <p className="ml-1">&mdash;&mdash;</p>
          <p className="px-2">Restaurant Partner</p>
          <p>&mdash;&mdash;</p>
        </div>
      </div>
      <div className="text-[9px] sm:text-xs md:text-sm text-red-500">
        <p>Need help?</p>
        <p>
          Email:{" "}
          <a
            href="mailto:merchantonboarding@epiceatz.com"
            className="hover:text-red-800"
          >
            merchantonboarding@epiceatz.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default NavbarPartner;
