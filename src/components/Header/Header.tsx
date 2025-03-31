import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "/homeicon.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/"); 
  };

  return (
    <nav className="relative sticky w-full bg-teal-400 text-gray-900 p-4 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md px-8 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={HomeIcon}
          alt="Home Icon"
          className="w-6 h-6 sm:w-7 sm:h-7 p-1 mr-2"
        />
        <span className="text-slate-200 text-2xl font-bold">Casa Pro</span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8 font-medium text-white">
        <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
          <Link to="/">Home</Link>
        </li>

        {isAuthenticated ? (
          <>
            <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
              <Link to="/profile">My Profile</Link>
            </li>
            <li
              className="relative cursor-pointer after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
              onClick={handleLogout}
            >
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
              <Link to="/login">Login</Link>
            </li>
            <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300 bg-transparent border rounded px-3">
              <Link to="/create-account">Create an account</Link>
            </li>
          </>
        )}

        <li className="relative after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
          <a href="#">Contact</a>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden transition-all duration-300">
          <ul className="flex flex-col space-y-4 p-6">
            <li>
              <Link
                to="/"
                className="block py-2 text-lg hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-lg hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 text-lg hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block py-2 text-lg text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 text-lg hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-account"
                    className="block py-2 text-lg hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Create an account
                  </Link>
                </li>
              </>
            )}
            <li>
              <a
                href="#"
                className="block py-2 text-lg hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
