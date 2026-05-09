import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaPlane } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Destinations", path: "/destinations" },
  { label: "Destinations Details", path: "/destinations-details" },
  { label: "About Us", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="bg-orange-500 text-white p-2 rounded-lg">
            <FaPlane className="text-lg rotate-45" />
          </div>
          <span className="font-bold text-gray-900 text-lg">Fun Holidays</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Search + Book Now */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center border border-gray-200 rounded-full px-3 py-1.5 gap-2 bg-gray-50">
            <FaSearch className="text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm text-gray-700 w-28 placeholder-gray-400"
            />
          </div>

          {/* Book Now Button */}
          <Link
            to="/book"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-gray-700 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-medium py-1 ${
                    location.pathname === link.path
                      ? "text-orange-500"
                      : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center border border-gray-200 rounded-full px-3 py-1.5 gap-2 bg-gray-50 flex-1">
              <FaSearch className="text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
              />
            </div>
            <Link
              to="/book"
              className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;