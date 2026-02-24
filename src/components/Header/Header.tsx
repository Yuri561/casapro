import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "/homeicon.png";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useAuth } from "../../context/AuthContext";
import { userLogout } from "../../UserAuth/user_auth";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await userLogout();
      localStorage.clear();
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    if (location.pathname === path) return;
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 400);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLink = (path: string, danger = false) =>
    `
    relative text-sm font-medium transition-all duration-300
    ${
      danger
        ? "text-red-400 hover:text-red-300"
        : "text-gray-300 hover:text-white"
    }
    ${
      isActive(path)
        ? "text-cyan-400 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cyan-400"
        : "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-300"
    }
  `;

  return (
    <>
      {loading && <LoadingAnimation />}

      <nav
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-[#0f172a]/80 border-b border-white/10"
        role="navigation"
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-3 group"
            aria-label="Go to home"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur">
              <img src={HomeIcon} alt="CasaPro" className="w-5 h-5" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight group-hover:text-cyan-400 transition">
              CasaPro
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            <li>
              <button className={navLink("/")} onClick={() => handleNavigation("/")}>
                Home
              </button>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <button
                    className={navLink("/dashboard")}
                    onClick={() => handleNavigation("/dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className={navLink("/profile")}
                    onClick={() => handleNavigation("/profile")}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className={navLink("/logout", true)}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className={navLink("/login")}
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/create-account")}
                    className="rounded-xl bg-cyan-400 text-black text-sm font-semibold px-5 py-2 shadow-lg shadow-cyan-400/20 hover:opacity-90 transition"
                  >
                    Create account
                  </button>
                </li>
              </>
            )}

            <li>
              <button
                className={navLink("/contact")}
                onClick={() => handleNavigation("/contact")}
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="md:hidden text-white p-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-[90vh]" : "max-h-0"
          }`}
        >
          <div className="bg-[#0f172a] border-t border-white/10 backdrop-blur-xl">
            <ul className="flex flex-col divide-y divide-white/10">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="w-full px-6 py-4 text-left text-gray-300 hover:text-cyan-400"
                >
                  Home
                </button>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <button
                      onClick={() => handleNavigation("/dashboard")}
                      className="w-full px-6 py-4 text-left text-gray-300 hover:text-cyan-400"
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="w-full px-6 py-4 text-left text-gray-300 hover:text-cyan-400"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full px-6 py-4 text-left text-red-400 hover:text-red-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="w-full px-6 py-4 text-left text-gray-300 hover:text-cyan-400"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/create-account")}
                      className="w-full px-6 py-4 text-left text-gray-300 hover:text-cyan-400"
                    >
                      Create account
                    </button>
                  </li>
                </>
              )}

              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="w-full px-6 py-4 text-left text-gray-300 hover:text-cyan-400"
                >
                  Contact
                </button>
              </li>
            </ul>

            {!isAuthenticated && (
              <div className="p-6">
                <button
                  onClick={() => handleNavigation("/create-account")}
                  className="w-full rounded-xl bg-cyan-400 text-black py-3 font-semibold shadow-lg shadow-cyan-400/20"
                >
                  Get started free
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div aria-hidden="true" className="h-16" />
    </>
  );
};

export default Header;