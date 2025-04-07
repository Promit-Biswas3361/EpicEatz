import React, { useState } from "react";
import { House, Building, MapPin } from "lucide-react";
import AddressManager from "./AddressManager";

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
    type: "Others",
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
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((item) => item.id !== id));
  };

  const closeAddressManager = () => {
    setSelectedAddress(null);
    setIsAdding(false);
  };

  const updateAddress = (updatedAddress) => {
    setAddresses(
      addresses.map((item) =>
        item.id === updatedAddress.id ? updatedAddress : item
      )
    );
    closeAddressManager();
  };

  const addNewAddress = (newAddress) => {
    const validAddress = addresses || [];

    const newId = validAddress.length
      ? Math.max(...validAddress.map((item) => item.id)) + 1
      : 1;
    setAddresses([...validAddress, { ...newAddress, id: newId }]);
    closeAddressManager();
  };

  const openAddAddress = () => {
    setIsAdding(true);
    setSelectedAddress({
      id: null,
      label: "",
      type: "Home",
      address: "",
      phone: "",
    });
  };

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-8">Manage Addresses</h3>

      <div className="flex flex-wrap gap-2">
        {!(addresses && addresses.length > 0) && (
          <p className="text-lg">No addresses found!!</p>
        )}
        {addresses &&
          addresses.length > 0 &&
          addresses.map((item) => (
            <div
              key={item.id}
              className="flex items-start border-1 border-gray-400 p-3 mb-2 max-sm:w-full sm:w-70 md:w-80"
            >
              <div className="flex-1/6 mt-1">
                {item.type === "Home" ? (
                  <House size={22} />
                ) : item.type === "Office" ? (
                  <Building size={22} />
                ) : item.type === "Others" ? (
                  <MapPin size={22} />
                ) : null}
              </div>

              <div className="flex-5/6 flex flex-col items-start">
                <p className="text-lg font-semibold">{item.label}</p>
                <p className="text-sm">{item.address}</p>
                <div className="flex text-sm mt-1.5">
                  <p className="mr-1.5 font-semibold">Phone: </p>
                  <p>{item.phone}</p>
                </div>

                <div className="flex mt-3">
                  <button
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer mr-5"
                    onClick={() => {
                      setSelectedAddress(item);
                      setIsAdding(false);
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                    onClick={() => deleteAddress(item.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center mt-5 mb-2">
        <button
          onClick={openAddAddress}
          className="bg-green-600 px-2 py-1 text-white font-semibold cursor-pointer"
        >
          ADD ADDRESS
        </button>
      </div>

      {selectedAddress && (
        <AddressManager
          onClose={closeAddressManager}
          address={selectedAddress}
          onSave={isAdding ? addNewAddress : updateAddress}
          isAdding={isAdding}
        />
      )}
    </div>
  );
};

export default Address;
