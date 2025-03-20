import React from "react";
import NavbarPartner from "./NavbarPartner";
import FooterPartner from "./FooterPartner";

const Step2 = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <NavbarPartner />
      <FooterPartner text="Submit" url="/" />
    </div>
  );
};

export default Step2;
