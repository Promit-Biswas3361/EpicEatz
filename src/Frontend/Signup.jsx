import React, { useState, useEffect, useRef } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signup({ onClose, openLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current.type = showPassword ? "text" : "password";
    }
  }, [showPassword]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role: "User" }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please log in.");
        onClose();
        openLogin();
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-md z-40">
      <div className="bg-red-100 w-90 sm:w-115 md:w-130 max-w-screen flex flex-col px-7 py-2 rounded-xl z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl">
        <div className="flex flex-row justify-between items-center text-gray-600">
          <h1 className="text-3xl font-semibold">Signup</h1>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        <form
          className="flex flex-col justify-center pb-4 border-b-1 border-gray-400 mb-4"
          onSubmit={handleSignup}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            className="bg-white border-1 border-gray-400 h-12 rounded mt-8 mb-5 px-3 outline-green-600"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            required
            className="bg-white border-1 border-gray-400 h-12 rounded mb-5 px-3 outline-green-600"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            required
            className="bg-white border-1 border-gray-400 h-12 rounded mb-5 px-3 outline-green-600"
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex items-center relative">
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
              value={password}
              className="bg-white w-full border-1 border-gray-400 h-12 rounded mb-5 px-3 outline-green-600"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              className="absolute z-20 right-3.5 top-3.5 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff color="gray" size={21} />
              ) : (
                <Eye color="gray" size={21} />
              )}
            </div>
          </div>
          <input
            type="submit"
            className="bg-[#f75c5c] hover:bg-[#ff2e45] h-12 rounded mb-5 cursor-pointer text-gray-100 text-xl"
            value="Create Account"
          />
        </form>
        <div className="flex flex-row text-[15px]">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-red-500"
              onClick={() => {
                onClose();
                openLogin();
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
