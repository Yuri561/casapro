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
  const { isAuthenticated, setIsAuthenticated,  } = useAuth();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
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
      localStorage.removeItem("user");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
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
    }, 600);
  };

  const isActive = (path: string) => location.pathname === path;

  const baseLink =
    "relative cursor-pointer px-1 py-0.5 text-sm font-medium transition";
  const activeUnderline =
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-full";
  const inactiveUnderline =
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white/70 after:w-0 hover:after:w-full after:transition-all after:duration-300";
  const desktopLink = (path: string, danger = false) =>
    [
      baseLink,
      danger ? "text-red-400 hover:text-red-300" : "text-white hover:opacity-90",
      isActive(path) ? activeUnderline : inactiveUnderline,
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded",
    ].join(" ");

  return (
    <>
      {loading && <LoadingAnimation />}

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>

      <nav
        className="fixed inset-x-0 top-0 z-50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/70"
        role="navigation"
        aria-label="Primary"
      >
        <div className="mx-auto max-w-7xl px-4  h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
            aria-label="Go to home"
          >
            <img
              src={HomeIcon}
              alt="CasaPro"
              className="w-7 h-7 rounded bg-white/10 p-1 ring-1 ring-white/15"
            />
            <span className="text-white text-xl font-bold tracking-tight group-hover:opacity-90">
              CasaPro
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            <li className={desktopLink("/")}>
              <button onClick={() => handleNavigation("/")}>Home</button>
            </li>

            {isAuthenticated ? (
              <>
                <li className={desktopLink("/dashboard")}>
                  <button onClick={() => handleNavigation("/dashboard")}>
                    Dashboard
                  </button>
                </li>
                <li className={desktopLink("/profile")}>
                  <button onClick={() => handleNavigation("/profile")}>
                    My Profile
                  </button>
                </li>
                <li className={desktopLink("/logout", true)}>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className={desktopLink("/login")}>
                  <button onClick={() => handleNavigation("/login")}>
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/create-account")}
                    className="rounded-xl bg-white text-black text-sm font-medium px-4 py-2 shadow-sm hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    Create account
                  </button>
                </li>
              </>
            )}

            <li className={desktopLink("/contact")}>
              <button onClick={() => handleNavigation("/contact")}>
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="md:hidden text-white p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden transition-[max-height] duration-300 overflow-hidden ${
            isOpen ? "max-h-[80vh]" : "max-h-0"
          }`}
        >
          {/* Backdrop for mobile to dim page content */}
          <div className="bg-white text-gray-900 shadow-xl">
            <ul className="flex flex-col divide-y divide-gray-200">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="w-full text-left px-6 py-4 hover:bg-gray-50"
                >
                  Home
                </button>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <button
                      onClick={() => handleNavigation("/dashboard")}
                      className="w-full text-left px-6 py-4 hover:bg-gray-50"
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="w-full text-left px-6 py-4 hover:bg-gray-50"
                    >
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-4 text-red-600 hover:bg-gray-50"
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
                      className="w-full text-left px-6 py-4 hover:bg-gray-50"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation("/create-account")}
                      className="w-full text-left px-6 py-4 hover:bg-gray-50"
                    >
                      Create an account
                    </button>
                  </li>
                </>
              )}

              <li>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="w-full text-left px-6 py-4 hover:bg-gray-50"
                >
                  Contact
                </button>
              </li>
            </ul>

            {/* Mobile footer CTA */}
            {!isAuthenticated && (
              <div className="p-6">
                <button
                  onClick={() => handleNavigation("/create-account")}
                  className="w-full rounded-xl bg-black text-white py-3 font-medium hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  Get started free
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer to offset fixed nav height */}
      <div aria-hidden="true" className="h-16" />

      {/* Main landmark target for skip link */}
      <div id="main" />
    </>
  );
};

export default Header;
