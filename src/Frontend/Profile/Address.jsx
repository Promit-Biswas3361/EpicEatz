import React, { useState } from "react";
import { House, Building, MapPin } from "lucide-react";

const userAddresses = [
  {
    id: 1,
    label: "Home Address",
    type: "Home",
    address: "123 Main Street, Apartment 4B, New York, NY 10001",
    phone: "+1 212-555-1234",
  },
  {
    id: 2,
    label: "Office Address",
    type: "Office",
    address: "456 Corporate Blvd, Suite 1203, San Francisco, CA 94105",
    phone: "+1 415-555-9876",
  },
  {
    id: 3,
    label: "Summer House",
    type: "Home",
    address: "789 Beachfront Road, Unit 5, Miami Beach, FL 33139",
    phone: "+1 305-555-5678",
  },
  {
    id: 4,
    label: "Parents' House",
    type: "Friends & Family",
    address: "101 Oak Drive, Suburbia, Chicago, IL 60007",
    phone: "+1 312-555-2345",
  },
  {
    id: 5,
    label: "Vacation Spot",
    type: "Home",
    address: "202 Mountain View Lane, Aspen, CO 81611",
    phone: "+1 970-555-8765",
  },
];

const Address = () => {
  const [addresses, setAddresses] = useState(userAddresses);

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-10">Manage Addresses</h3>

      <div className="flex flex-wrap justify-between">
        {addresses.map((item) => (
          <div
            key={item.id}
            className="flex items-start border-1 border-gray-400 p-3 mb-4 max-sm:w-full sm:w-70 md:w-90 lg:w-[42%]"
          >
            <div className="flex-1/6 mt-1">
              {item.type === "Home" ? (
                <House size={22} />
              ) : item.type === "Office" ? (
                <Building size={22} />
              ) : item.type === "Friends & Family" ? (
                <MapPin size={22} />
              ) : null}
            </div>

            <div className="flex-5/6 flex flex-col items-start">
              <p className="text-lg font-semibold">{item.label}</p>
              <p className="text-sm">{item.address}</p>

              <div className="flex mt-3">
                <button className="text-red-500 hover:text-red-700 font-bold cursor-pointer mr-5">
                  EDIT
                </button>
                <button className="text-red-500 hover:text-red-700 font-bold cursor-pointer">
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;
