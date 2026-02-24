import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import HomeIcon from "/homeicon.png";
import "../../index.css";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-cyan-500/10 via-[#0f172a] to-blue-500/10 text-gray-300 py-12 px-6 w-full">

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">

        {/* Left */}
        <div className="flex items-center gap-3">
          <img src={HomeIcon} alt="Home Icon" className="w-7 h-7 rounded bg-white/10 p-1" />
          <span className="font-semibold text-lg text-white tracking-tight">
            CasaPro
          </span>
        </div>

        {/* Middle Navigation */}
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          <a href="#home" className="text-gray-400 hover:text-cyan-400 transition">
            Home
          </a>
          <a href="#how-it-works" className="text-gray-400 hover:text-cyan-400 transition">
            How It Works
          </a>
          <a href="#newsletter" className="text-gray-400 hover:text-cyan-400 transition">
            Newsletter
          </a>
          <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition">
            Contact
          </a>
        </div>

        {/* Right - Social */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

      </div>

      {/* Divider + Copyright */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CasaPro. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;