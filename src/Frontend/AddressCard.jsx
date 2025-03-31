import React from "react";
import { House, Building, MapPin } from "lucide-react";

const AddressCard = ({ address, handleAddress }) => {
  return (
    <div className="flex cursor-pointer items-start border-1 border-gray-400 p-3 max-sm:w-full w-70 hover:shadow-lg">
      <div className="flex-1/6 mt-1">
        {address.type === "Home" ? (
          <House size={22} />
        ) : address.type === "Office" ? (
          <Building size={22} />
        ) : address.type === "Friends & Family" ? (
          <MapPin size={22} />
        ) : null}
      </div>

      <div className="flex-5/6 flex flex-col items-start">
        <p className="font-semibold">{address.label}</p>
        <p className="text-sm">{address.address}</p>
        <div className="flex items-center mt-1.5">
          <p className="text-sm font-semibold mr-1">Phone: {" "}</p>
          <p className="text-sm">{address.phone}</p>
        </div>

        <div className="flex mt-3 px-2 py-0.5 bg-green-600 hover:bg-green-800">
          <button
            className="text-white font-bold text-xs cursor-pointer"
            onClick={() => handleAddress(address.id)}
          >
            DELIVER HERE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
