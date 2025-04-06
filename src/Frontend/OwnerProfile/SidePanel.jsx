import React from "react";
import { NavLink } from "react-router-dom";
import { Heart, Settings, MapPinHouse, PackageOpen } from "lucide-react";

const SidePanel = () => {
  return (
    <div className="flex flex-col pl-5 pr-0.75 py-3 sticky opacity-80 bg-gray-300">
      <NavLink
        to="/owner-account/orders"
        className={({ isActive }) =>
          [
            isActive && "bg-white",
            "py-4 mb-3 max-sm:py-2 max-sm:mb-1.5 pl-2 pr-15",
          ].join(" ")
        }
      >
        <div className="flex items-center">
          <div className="bg-black rounded-[50%] p-0.75 mr-3">
            <PackageOpen color="white" size={22} />
          </div>
          <p className="font-bold">Orders</p>
        </div>
      </NavLink>

      <NavLink
        to="/owner-account/details"
        className={({ isActive }) =>
          [
            isActive && "bg-white",
            "py-4 mb-3 max-sm:py-2 max-sm:mb-1.5 pl-2 pr-15",
          ].join(" ")
        }
      >
        <div className="flex items-center">
          <div className="bg-black rounded-[50%] p-0.75 mr-4">
            <Heart color="white" size={22} />
          </div>
          <p className="font-bold">Restaurant Details</p>
        </div>
      </NavLink>

      <NavLink
        to="/owner-account/menu"
        className={({ isActive }) =>
          [
            isActive && "bg-white",
            "py-4 mb-3 max-sm:py-2 max-sm:mb-1.5 pl-2 pr-15",
          ].join(" ")
        }
      >
        <div className="flex items-center">
          <div className="bg-black rounded-[50%] p-0.75 mr-4">
            <MapPinHouse color="white" size={22} />
          </div>
          <p className="font-bold">Menu & Timings</p>
        </div>
      </NavLink>

      <NavLink
        to="/owner-account/settings"
        className={({ isActive }) =>
          [
            isActive && "bg-white",
            "py-4 mb-3 max-sm:py-2 max-sm:mb-1.5 pl-2 pr-15",
          ].join(" ")
        }
      >
        <div className="flex items-center">
          <div className="bg-black rounded-[50%] p-0.75 mr-4">
            <Settings color="white" size={22} />
          </div>
          <p className="font-bold">Settings</p>
        </div>
      </NavLink>
    </div>
  );
};

export default SidePanel;
