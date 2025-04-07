import React, { useState } from "react";
import { House, Building, MapPin, X } from "lucide-react";

const AddressManager = ({ onClose, address, onSave, isAdding }) => {
  const [updatedAddress, setUpdatedAddress] = useState({ ...address });

  const handleInputChange = (e) => {
    setUpdatedAddress({ ...updatedAddress, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type) => {
    setUpdatedAddress({ ...updatedAddress, type });
  };

  const handleSave = () => {
    onSave(updatedAddress);
  };

  return (
    <div className="fixed top-0 right-0 pl-8 pr-3 py-5 bg-white z-50 h-screen shadow-2xl max-sm:w-full sm:w-80 md:w-100">
      <div className="flex justify-between items-center mb-6">
        <p className="text-xl font-bold">
          {isAdding ? "Add New Address" : "Edit Address"}
        </p>
        <X onClick={onClose} className="cursor-pointer" />
      </div>

      <div className="flex flex-col">
        <div className="border-2 border-gray-200 mb-3 px-2 py-1">
          <p className="text-xs font-bold text-gray-500 mb-1.5">
            Label/Nickname
          </p>
          <input
            type="text"
            name="label"
            value={updatedAddress.label}
            onChange={handleInputChange}
            className="w-full outline-none border-none"
          />
        </div>
        <div className="border-2 border-gray-200 mb-3 px-2 py-1">
          <p className="text-xs font-bold text-gray-500 mb-1.5">Address</p>
          <input
            type="text"
            name="address"
            value={updatedAddress.address}
            onChange={handleInputChange}
            className="w-full outline-none border-none"
          />
        </div>

        <div className="border-2 border-gray-200 mb-3 px-2 py-1">
          <p className="text-xs font-bold text-gray-500 mb-1.5">Phone No.</p>
          <input
            type="tel"
            name="phone"
            value={updatedAddress.phone}
            onChange={handleInputChange}
            className="w-full outline-none border-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {["Home", "Office", "Others"].map((type) => (
          <div
            key={type}
            className={`flex flex-col flex-1/3 border items-center hover:bg-black hover:text-white cursor-pointer ${
              updatedAddress.type === type ? "bg-black text-white" : ""
            }`}
            onClick={() => handleTypeChange(type)}
          >
            <div className="flex py-2 items-center">
              {type === "Home" && <House size={17} />}
              {type === "Office" && <Building size={17} />}
              {type === "Others" && <MapPin size={17} />}
              <p className="ml-1.5 text-sm">{type}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className=" cursor-pointer mt-5 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        {isAdding ? "Save Address" : "Update Address"}
      </button>
    </div>
  );
};

export default AddressManager;
