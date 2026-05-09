import { MdEmail } from "react-icons/md";
import { FaPhone, FaGlobe } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const TopBar = () => {
  return (
    <div className="bg-[#1a1a1a] text-white text-sm py-2 px-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Welcome message */}
        <p className="text-gray-300 text-xs">
          Welcome to{" "}
          <span className="text-orange-500 font-semibold">Fun Holidays</span>{" "}
          travel agency, need helps for travel guide{" "}
          <a href="#" className="underline font-semibold text-white">
            Let's Talk
          </a>
        </p>

        {/* Right: Language, Email, Phone */}
        <div className="flex items-center gap-6">
          {/* Language Selector */}
          <button className="flex items-center gap-1 text-gray-300 hover:text-white transition">
            <FaGlobe className="text-orange-500" />
            <span>English</span>
            <IoChevronDown className="text-xs" />
          </button>

          {/* Email */}
          <a
            href="mailto:support@gmail.com"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition"
          >
            <MdEmail className="text-orange-500" />
            <span>Email : support@gmail.com</span>
          </a>

          {/* Phone */}
          <a
            href="tel:+1234567889"
            className="flex items-center gap-1 text-gray-300 hover:text-white transition"
          >
            <FaPhone className="text-orange-500" />
            <span>Call : +1-234-567-889</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;