import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import HomeIcon from "/homeicon.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 text-white py-6 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        {/* Logo + Name */}
        <div className="flex items-center space-x-3">
          <img src={HomeIcon} alt="Home Icon" className="w-6 h-6" />
          <span className="text-lg font-semibold">Casa Pro</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#home" className="hover:text-cyan-300">Home</a>
          <a href="#how-it-works" className="hover:text-cyan-300">How It Works</a>
          <a href="#newsletter" className="hover:text-cyan-300">Newsletter</a>
          <a href="#contact" className="hover:text-cyan-300">Contact</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-xs text-gray-300">
        &copy; {new Date().getFullYear()} Casa Pro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
