import { useState} from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "/homeicon.png";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // ✅ Use Auth Context
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  const handleNavigation = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* ✅ Show Loading Animation */}
      {loading && <LoadingAnimation />}

      <nav className="relative sticky w-full bg-teal-800 text-gray-900 p-4 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md px-8 z-50">
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
        <ul className="hidden md:flex space-x-8 font-medium ">
          <li
            className="relative text-white cursor-pointer after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
            onClick={() => handleNavigation("/")}
          >
            Home
          </li>

          {isAuthenticated ? (
            <>
              <li
                className="relative text-white cursor-pointer after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                onClick={() => handleNavigation("/dashboard")}
              >
                Dashboard
              </li>
              <li
                className="relative text-white cursor-pointer after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                onClick={() => handleNavigation("/profile")}
              >
                My Profile
              </li>
              <li
                className="relative text-red-500 cursor-pointer after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li
                className="relative text-white cursor-pointer after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
                onClick={() => handleNavigation("/login")}
              >
                Login
              </li>
              <li
                className="relative text-white cursor-pointer after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300 bg-transparent border rounded px-3"
                onClick={() => handleNavigation("/create-account")}
              >
                Create an account
              </li>
            </>
          )}
          <li
            className="relative text-white cursor-pointer after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300"
            onClick={() => handleNavigation("/contact")}
          >
            Contact
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
              <li
                onClick={() => {
                  handleNavigation("/");
                  setIsOpen(false);
                }}
              >
                Home
              </li>
              {isAuthenticated ? (
                <>
                  <li
                    onClick={() => {
                      handleNavigation("/dashboard");
                      setIsOpen(false);
                    }}
                  >
                    Dashboard
                  </li>
                  <li
                    onClick={() => {
                      handleNavigation("/profile");
                      setIsOpen(false);
                    }}
                  >
                    My Profile
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
                  <li
                    onClick={() => {
                      handleNavigation("/login");
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </li>
                  <li
                    onClick={() => {
                      handleNavigation("/create-account");
                      setIsOpen(false);
                    }}
                  >
                    Create an account
                  </li>
                </>
              )}
              <li
                onClick={() => {
                  handleNavigation("/contact");
                  setIsOpen(false);
                }}
              >
                Contact
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
