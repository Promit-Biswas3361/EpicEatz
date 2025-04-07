import React, { useState } from "react";
import NavbarPartner from "./NavbarPartner";
import {
  ConciergeBell,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pan: "",
    ifsc: "",
    accountNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [files, setFiles] = useState({
    fssai: null,
    gst: null,
    shopAct: null,
    bankProof: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    const form = new FormData();
    // Append files
    form.append("fssai", files.fssai);
    form.append("gst", files.gst);
    form.append("shopAct", files.shopAct);
    form.append("bankProof", files.bankProof);
  
    // Append text fields
    form.append("pan", formData.pan);
    form.append("ifsc", formData.ifsc);
    form.append("accountNumber", formData.accountNumber);
    form.append("password", formData.password);
  
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch("/api/restaurant/upload-documents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❗ Don't set Content-Type when using FormData
        },
        body: form,
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Documents uploaded successfully!");
        navigate("/");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };
  

  return (
    <div className="bg-gray-100">
      <NavbarPartner />

      <form
        onSubmit={handleSubmit}
        className="mt-16.5 md:mt-21.5 pt-10 pb-30 w-full"
        encType="multipart/form-data"
      >
        <div className="flex flex-row justify-center items-start px-10 lg:px-25 xl:px-45 2xl:px-55">
          {/* Sidebar */}
          <div className="hidden md:block md:flex-[35%] mr-3.5 bg-white h-fit rounded-lg pt-3">
            <div className="border-b-1 border-gray-200 px-3 pb-4 mb-3">
              <h4 className="text-xl font-semibold">
                Complete your registration
              </h4>
            </div>
            <div className="flex items-center px-4 mb-5">
              <div className="bg-green-300 border-3 border-green-600 rounded-[50%] p-1.5 mr-2.5">
                <ConciergeBell size={35} color="yellow" />
              </div>
              <p>Restaurant information</p>
            </div>
            <div className="flex items-center px-4 mb-5">
              <div className="bg-green-300 border-3 border-green-600 rounded-[50%] p-1.5 mr-2.5">
                <ClipboardList size={35} color="yellow" />
              </div>
              <p>Menu and operational details</p>
            </div>
            <div className="flex items-center px-3 mb-5 border-l-4 border-red-400">
              <div className="bg-red-300 border-3 border-red-600 rounded-[50%] p-1.5 mr-2.5">
                <ShieldCheck size={35} color="yellow" />
              </div>
              <p>Restaurant Documents</p>
            </div>
          </div>

          {/* Main form content */}
          <div className="flex-1 md:flex-[65%] ml-3.5">
            <h1 className="text-4xl font-bold mb-8">Restaurant Documents</h1>

            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">Official Documents</h3>
                <p className="text-sm text-gray-400">
                  Owner's banking and identification documents required for processing
                  and validation.
                </p>
              </div>

              <div className="px-5">
                <input
                  type="text"
                  name="pan"
                  placeholder="Business/Owner PAN*"
                  required
                  value={formData.pan}
                  onChange={handleInputChange}
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mb-4"
                />
                <input
                  type="text"
                  name="ifsc"
                  placeholder="Bank IFSC code*"
                  required
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mb-4"
                />
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Bank Account number*"
                  required
                  pattern="[0-9]*"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mb-3"
                />
                <div className="mb-5">
                  <label className="block mb-1 font-medium">
                    Upload Bank Proof*
                  </label>
                  <input
                    type="file"
                    name="bankProof"
                    required
                    onChange={handleFileChange}
                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 file:cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">Restaurant Documents</h3>
                <p className="text-sm text-gray-400">
                  Necessary legal and formal documents required for processing
                  and validation.
                </p>
              </div>
              <div className="flex flex-col px-5">
                <div className="mb-5">
                  <label className="block mb-1 font-medium">
                    Upload FSSAI Certificate*
                  </label>
                  <input
                    type="file"
                    name="fssai"
                    required
                    onChange={handleFileChange}
                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 file:cursor-pointer"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-1 font-medium">
                    Upload GST Certificate*
                  </label>
                  <input
                    type="file"
                    name="gst"
                    required
                    onChange={handleFileChange}
                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 file:cursor-pointer"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-1 font-medium">
                    Upload Shop Act License*
                  </label>
                  <input
                    type="file"
                    name="shopAct"
                    required
                    onChange={handleFileChange}
                    className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 file:cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg mb-8 py-6">
              <div className="border-b-1 border-gray-200 mb-3 pb-6 px-5">
                <h3 className="text-2xl font-semibold">
                  Complete your Registration
                </h3>
                <p className="text-sm text-gray-400">
                  Enter password to complete the registration process of your
                  restaurant.
                </p>
              </div>
              <div className="px-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mb-3"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password*"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full outline-none border-1 border-gray-200 rounded-lg py-2.5 px-3 shadow-sm mb-4"
                />
              </div>
            </div>

            <div className="w-full flex justify-end px-5 fixed bottom-0 left-0 bg-white py-4">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 cursor-pointer transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step3;
