import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import SidePanel from "./SidePanel";
import Footer from "../Footer";

const OwnerAccount = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect if not logged in
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          alert(data.message);
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token"); // Remove token in case of error
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Navbar />
      <div className="mt-35 py-12 w-[88%]">
        <div className="mb-8">
          <p className="text-3xl font-bold">
            {user?.restaurantName || "Loading..."}
          </p>
          <div className="flex mt-1 gap-2">
            <p className="text-lg font-light">{user?.phone}</p>
            <p className="font-semibold text-lg">.</p>
            <p className="text-lg font-light">{user?.email}</p>
          </div>
        </div>
        <div className="bg-white md:flex max-md:pb-5 pt-8 px-8">
          <SidePanel />
          <div className="max-md:mt-10 md:ml-8 md:flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OwnerAccount;
