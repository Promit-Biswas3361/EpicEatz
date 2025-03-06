import React, { useState } from "react";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      className={`bg-red-100 w-130 flex flex-col px-7 py-2 rounded-xl z-50 ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="flex flex-row justify-between items-center text-gray-600">
        <h1 className="text-3xl font-semibold">Signup</h1>
        <X className="cursor-pointer" onClick={() => setIsVisible(false)} />
      </div>
      <form
        className="flex flex-col justify-center pb-4 border-b-1 border-gray-400 mb-4"
        onSubmit={() => navigate("/")}
      >
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          required
          className="bg-white border-1 border-gray-400 h-12 rounded mt-8 mb-5 px-3 outline-green-600"
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
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          className="bg-white border-1 border-gray-400 h-12 rounded mb-5 px-3 outline-green-600"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          className="bg-[#f75c5c] hover:bg-[#ff2e45] h-12 rounded mb-5 cursor-pointer text-gray-100 text-xl"
          value="Create Account"
        />
      </form>
      <div className="flex flex-row text-[15px]">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
