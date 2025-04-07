import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/loginSlice";
import { useNavigate } from "react-router-dom";

const OwnerSettings = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatePassword = (e) => {
    e.preventDefault();
    if (password === confirmPassword) alert("Password updated!");
    else alert("Password doesn't match. Please try again.");

    setConfirmPassword("");
    setPassword("");
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div>
      <h3 className="text-2xl font-extrabold mb-8">Account Settings</h3>

      <div className="bg-gray-100 rounded-lg px-5 py-2.5 w-full lg:w-fit">
        <h4 className="text-lg font-semibold">Reset Password</h4>
        <form className="flex flex-col text-center" onSubmit={updatePassword}>
          <input
            type="password"
            className="outline-none border-1 rounded-lg h-12 mb-2 mt-2 bg-white px-3.5 w-full lg:w-130"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="outline-none border-1 rounded-lg h-12 mb-2 bg-white px-3.5 w-full lg:w-130"
            required
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="w-full">
            <input
              type="submit"
              className="bg-green-600 w-fit text-center text-white px-3 py-1 rounded-md cursor-pointer hover:bg-green-700"
              value="UPDATE"
            />
          </div>
        </form>
      </div>
      <div className="my-4.5 bg-gray-100 rounded-lg px-5 py-2.5 w-full lg:w-140">
        <h4 className="text-lg font-semibold">Logout</h4>
        <div className="flex flex-col items-center mt-2">
          <button onClick={logoutUser} className="rounded-md bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-center cursor-pointer">
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerSettings;
