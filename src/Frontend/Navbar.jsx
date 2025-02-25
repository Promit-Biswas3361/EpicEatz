import React, { useState } from "react";
import { Search, CircleUser, ShoppingCart, Heart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [login, setLogin] = useState(false);
  return (
    <div className="flex flex-row justify-between w-full h-auto bg-red-200 items-center">
      <div className="">
        <Link to="/">
          <img
            src="/EpicEatz_logo.png"
            alt="EpicEatz Logo"
            className="h-35 w-auto"
          />
        </Link>
      </div>

      <div className="flex items-center rounded-xl p-2 bg-white w-1/3 md:w-2/5 h-auto">
        <Search
          size={30}
          className="cursor-pointer mr-1"
          onClick={() => setInput("")}
        />
        <input
          type="text"
          placeholder="Search for restraunt, cuisine or a dish"
          className="bg-white h-10 w-full ml-3 outline-none border-none"
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

      {login ? (
        <div className="mr-2 flex flex-row justify-end">
          <NavLink to="/favourites" className="mx-3">
            <Heart
              size={32}
              color="white"
              className="hover:fill-red-500 color-white"
            />
          </NavLink>
          <NavLink to="/cart" className="mx-3">
            <ShoppingCart
              size={32}
              color="white"
              className="hover:fill-red-500"
            />
          </NavLink>
          <NavLink to="/account" className="mx-3">
            <CircleUser
              size={32}
              color="white"
              className="hover:fill-red-500"
            />
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-row justify-end">
          <NavLink
            to="/login"
            className="text-red-600 md:text-lg bg-white p-2.5 rounded-r-full rounded-l-full mx-2 hover:bg-gray-200"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="text-white md:text-lg bg-[#f75c5c] p-2.5 rounded-r-full rounded-l-full mx-2 hover:bg-red-500"
          >
            SignUp
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
