import React, { useState } from "react";
import { Search, CircleUser, ShoppingCart, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useSelector } from "react-redux";

const NavbarLanding = () => {
  const [input, setInput] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  const { isAuthenticated, user, error } = useSelector((state) => state.login);

  const openLogin = () => {
    setLoginVisible(true);
  };

  const closeLogin = () => {
    setLoginVisible(false);
  };

  const openSignup = () => {
    setSignupVisible(true);
  };

  const closeSignup = () => {
    setSignupVisible(false);
  };

  const authSuccess = () => {
    setLoginVisible(false);
    setSignupVisible(false);
  };

  return (
    <div className="relative bg-[url(/bg.jpeg)] w-full h-110 bg-cover bg-left bg-no-repeat">
      {isAuthenticated ? (
        <div className="pt-3 pb-10 mr-2 flex flex-row justify-end items-center">
          <NavLink to="/account/favourites" className="mx-3">
            <Heart
              color="white"
              className="hover:fill-red-500  h-8 w-8 lg:h-10 lg:w-10"
            />
          </NavLink>
          <NavLink to="/cart" className="mx-3">
            <ShoppingCart
              color="white"
              className="hover:fill-red-500  h-8 w-8 lg:h-10 lg:w-10"
            />
          </NavLink>
          <NavLink to="/account/orders" className="mx-3">
            <CircleUser
              color="white"
              className="hover:fill-red-500  h-8 w-8 lg:h-10 lg:w-10"
            />
          </NavLink>
        </div>
      ) : (
        <div className="pt-3 pb-10 flex flex-row justify-end">
          <NavLink
            to="/new-partner/get-started"
            className="text-red-600 md:text-lg bg-white p-2.5 rounded-full mx-2 hover:bg-gray-200"
          >
            Add Restaurant
          </NavLink>
          <NavLink
            className="text-red-600 md:text-lg bg-white p-2.5 rounded-full mx-2 hover:bg-gray-200"
            onClick={openLogin}
          >
            Login
          </NavLink>
          <NavLink
            className="text-white md:text-lg bg-[#f75c5c] p-2.5 rounded-full mx-2 hover:bg-red-500"
            onClick={openSignup}
          >
            SignUp
          </NavLink>
        </div>
      )}
      <div className="mt-15 flex flex-col items-center">
        <div className="text-center mb-7">
          <NavLink
            to="/"
            className="text-[#FF2400] text-5xl md:text-7xl font-extrabold mb-2"
          >
            EpicEatz
          </NavLink>
          <p className="text-white text-2xl md:text-4xl">
            Discover the best food & drinks near you
          </p>
        </div>
        <div className="flex items-center rounded-xl px-2 bg-white w-2/3 lg:w-1/2">
          <Search
            size={30}
            className="cursor-pointer mr-1"
            onClick={() => setInput("")}
          />
          <input
            type="text"
            placeholder="Search for restraunt, cuisine or a dish"
            className="bg-white h-15 w-full ml-3 outline-none border-none"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                setInput("");
              }
            }}
          />
        </div>
      </div>
      {loginVisible && <Login onClose={closeLogin} authSuccess={authSuccess} />}
      {signupVisible && (
        <Signup onClose={closeSignup} authSuccess={authSuccess} />
      )}
    </div>
  );
};

export default NavbarLanding;
