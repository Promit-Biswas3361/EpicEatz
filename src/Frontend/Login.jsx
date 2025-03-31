import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../Redux/loginSlice";

const Login = ({ onClose, authSuccess, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token with Bearer prefix
        localStorage.setItem("token", `Bearer ${data.token}`);
        // Dispatch loginSuccess action with user email
        dispatch(loginSuccess({ email }));

        if (typeof authSuccess === "function") {
          authSuccess(); // Close modal if function is valid
        } else {
          console.warn("authSuccess is not a function");
        }

        navigate("/"); // Redirect to account page
      } else {
        alert(data.message || "Login failed");
        dispatch(loginFailure());
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
      dispatch(loginFailure());
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-md z-40">
      <div className="bg-red-100 w-90 sm:w-115 md:w-130 max-w-screen flex flex-col px-7 py-2 rounded-xl z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl text-gray-600 font-semibold">Login</h1>
          <X className="text-gray-600 cursor-pointer" onClick={onClose} />
        </div>
        <form className="flex flex-col justify-center pb-4 border-b-1 border-gray-400 mb-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            required
            className="bg-white border-1 border-gray-400 h-12 rounded mt-8 mb-5 px-3 outline-green-600"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            className="bg-white border-1 border-gray-400 h-12 rounded mb-5 px-3 outline-green-600"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Login" className="bg-[#f75c5c] hover:bg-[#ff2e45] h-12 rounded mb-5 cursor-pointer text-gray-100 text-xl" />
        </form>
        <div className="flex flex-row text-[15px]">
          <p className="text-gray-600">
            New to EpicEatz?{" "}
            <Link
              className="text-red-500"
              onClick={() => {
                onClose();
                openSignup();
              }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
