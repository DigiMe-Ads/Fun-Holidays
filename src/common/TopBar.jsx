import { MdEmail } from "react-icons/md";
import { FaPhone, FaGlobe } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const TopBar = () => {
  return (
    <div className="bg-[#1a1a1a] text-white text-sm py-2 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-0">

        {/* Welcome message */}
        <p className="text-gray-300 text-xs text-center sm:text-left">
          Welcome to{" "}
          <span className="text-orange-500 font-semibold">Fun Holidays.</span>{" "}
          Need help for travel guide{" "}
          <a href="#" className="underline font-semibold text-white">
            Let's Talk
          </a>
        </p>

        {/* Right: contact info */}
        <div className="flex items-center gap-3 sm:gap-6">

          {/* Language — hidden on xs, shown sm+ */}
          <button className="hidden sm:flex items-center gap-1 text-gray-300 hover:text-white transition">
            <FaGlobe className="text-orange-500" />
            <span className="text-xs">English</span>
            <IoChevronDown className="text-xs" />
          </button>

          {/* Email — icon only on mobile, full on sm+ */}
          <a
            href="mailto:support@gmail.com"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition"
          >
            <MdEmail className="text-orange-500 shrink-0" />
            <span className="hidden sm:inline text-xs">
              Email : support@gmail.com
            </span>
          </a>

          {/* Phone — icon only on mobile, full on sm+ */}
          <a
            href="tel:+94322250903"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition"
          >
            <FaPhone className="text-orange-500 shrink-0" />
            <span className="hidden sm:inline text-xs">
              Call : +94 32 225 0903
            </span>
          </a>

        </div>
      </div>
    </div>
  );
};

export default TopBar;