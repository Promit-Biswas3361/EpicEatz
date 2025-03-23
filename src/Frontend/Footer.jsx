import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github, Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-28 w-full">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400">EpicEatz</h2>
            <p className="text-gray-400">
              Delicious meals delivered to your doorstep. Order now and satisfy
              your cravings!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-300">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400">Follow Us</h3>
            <div className="mt-4 flex space-x-6">
              <a href="https://linkedin.com/in/promit-biswas-5a7763284">
                <Linkedin color="white" />
              </a>
              <a href="https://github.com/Promit-Biswas3361/EpicEatz.git">
                <Github color="white" />
              </a>
              <a href="mailto:info@epiceatz.com">
                <Mail color="white" />
              </a>
              <a href="#">
                <Instagram color="white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center text-gray-500">
          © {new Date().getFullYear()} EpicEatz. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
