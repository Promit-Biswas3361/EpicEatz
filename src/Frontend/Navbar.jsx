import React, { useState } from "react";
import { Search, CircleUser, ShoppingCart, Heart } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  const { isAuthenticated, role } = useSelector((state) => state.login);
  const navigate = useNavigate();

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

  const searchDish = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await fetch(`http://localhost:5000/api/dish/${input}`);
        const data = await response.json();

        setInput("");

        if (response.ok) {
          navigate(`/dish/${input}`, { state: { dishData: data } });
        } else {
          alert(data.message || "Dish not found");
        }
      } catch (error) {
        console.error("Failed to fetch dish: ", error);
        alert("Error fetching dish: ");
      }
    }
  };

  return (
    <div className="flex flex-row justify-between w-full h-auto bg-red-200 items-center fixed top-0 z-50">
      <div className="">
        <Link to="/" >
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
          onKeyDown={searchDish}
        />
      </div>

      {!isAuthenticated ? (
        <div className="flex items-center justify-center">
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
      ) : role === "User" ? (
        <div className="flex items-center justify-center">
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
        <div className="flex items-center justify-center">
          <NavLink to="/owner-account/orders" className="mx-3">
            <CircleUser
              color="white"
              className="hover:fill-red-500  h-8 w-8 lg:h-10 lg:w-10"
            />
          </NavLink>
        </div>
      )}

      {loginVisible && (
        <Login
          onClose={closeLogin}
          authSuccess={authSuccess}
          openSignup={openSignup}
        />
      )}
      {signupVisible && (
        <Signup
          onClose={closeSignup}
          authSuccess={authSuccess}
          openLogin={openLogin}
        />
      )}
    </div>
  );
};

export default Navbar;
