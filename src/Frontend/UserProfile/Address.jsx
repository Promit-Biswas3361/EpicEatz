import React, { useEffect, useState } from "react";
import { House, Building, MapPin } from "lucide-react";
import AddressManager from "./AddressManager";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect if not logged in
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/user/addresses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setAddresses(data.addresses);
        } else {
          alert(data.message || "Failed to fetch addresses.");
        }
      } catch (err) {
        console.error("Failed to fetch addresses: ", err);
      }
    };

    fetchAddresses();
  }, [addresses]);

  const deleteAddress = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect if not logged in
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/address/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAddresses(addresses.filter((item) => item.id !== id));
      } else {
        alert(data.message || "Failed to delete address.");
      }
    } catch (err) {
      console.error("Failed to delete address: ", err);
    }
  };

  const closeAddressManager = () => {
    setSelectedAddress(null);
    setIsAdding(false);
  };

  const updateAddress = async (updatedAddress) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/address/update/${updatedAddress._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedAddress),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAddresses(
          addresses.map((item) =>
            item._id === updatedAddress._id ? data.address : item
          )
        );
        closeAddressManager();
      } else {
        alert(data.message || "Failed to update address.");
      }
    } catch (err) {
      console.error("Failed to update address:", err);
    }
  };

  const addNewAddress = async (newAddress) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect if not logged in
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/user/add-address/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAddress),
      });

      const data = await response.json();
      if (response.ok) {
        setAddresses([...addresses, data.address]);
        closeAddressManager();
      } else {
        alert(data.message || "Failed to add address.");
      }
    } catch (err) {
      console.error("Failed to add address: ", err);
    }
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
              key={item._id}
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
                    onClick={() => deleteAddress(item._id)}
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
