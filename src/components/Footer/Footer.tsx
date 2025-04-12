import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import HomeIcon from "/homeicon.png";
import '../../index.css'
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#03554b] text-white py-10 px-6 footer w-full h-[30px]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 h-full">
        {/* Left */}
        <div className="flex items-center space-x-2">
          <img src={HomeIcon} alt="Home Icon" className="w-6 h-6" />
          <span className="font-semibold text-lg">Casa Pro</span>
        </div>

        {/* Middle Navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#home" className="hover:text-cyan-300">Home</a>
          <a href="#how-it-works" className="hover:text-cyan-300">How It Works</a>
          <a href="#newsletter" className="hover:text-cyan-300">Newsletter</a>
          <a href="#contact" className="hover:text-cyan-300">Contact</a>
        </div>

        {/* Right - Social */}
        <div className="flex  gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="hidden text-center text-xs text-gray-300 ">
        &copy; {new Date().getFullYear()} Casa Pro. All rights reserved.
      </div>
    </footer>

  );
};

export default Footer;
