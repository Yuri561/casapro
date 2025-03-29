import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold font-pj text-gray-900">Casa Pro</h2>
            <p className="mt-2 text-gray-600">
              Your home inventory, simplified.
            </p>
          </div>

          <div className="flex space-x-8 text-center">
            <a href="#home" className="text-gray-900">
              Home
            </a>
            <a href="#how-it-works" className="text-gray-900">
              How It Works
            </a>
            <a href="#newsletter" className="text-gray-900">
              Newsletter
            </a>
            <a href="#contact" className="text-gray-900 ">
              Contact
            </a>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Casa Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
