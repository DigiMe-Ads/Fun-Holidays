import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaChevronRight, FaChevronUp } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import { isSafari } from "../utils/browser";

const services = ["Best Tour Guide", "Tour Booking", "Hotel Booking", "Ticket Booking"];
const company = ["About Us", "Community", "Jobs Careers", "News Blog"];
const destinations = ["African Safaris", "Alaska & Canada", "South America", "Middle East"];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Footer = () => {
  const topRef = useRef(null);
  useScrollReveal(topRef, 100);

  return (
    <footer className="bg-[#141414] w-full py-20">

      {/* Main Footer Links */}
      <div
        ref={topRef}
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10"
      >

        {/* Services */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Services</h4>
          <ul className="flex flex-col gap-8">
            {services.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-orange-500 transition-colors"
                >
                  <FaChevronRight className="text-[10px] shrink-0" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Company</h4>
          <ul className="flex flex-col gap-8">
            {company.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-orange-500 transition-colors"
                >
                  <FaChevronRight className="text-[10px] shrink-0" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Destinations</h4>
          <ul className="flex flex-col gap-8">
            {destinations.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-400 text-sm hover:text-orange-500 transition-colors"
                >
                  <FaChevronRight className="text-[10px] shrink-0" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get In Touch */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Get In Touch</h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <MdLocationOn className="text-gray-400 text-lg mt-0.5 shrink-0" />
              <span className="text-gray-400 text-sm leading-relaxed">
                #271 Stanley Thilakeratne Mw, Nugegoda,<br />  Colombo, Sri Lanka 
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MdEmail className="text-gray-400 text-lg shrink-0" />
              <a
                href="mailto:supportrevelo@gmail.com"
                className="text-gray-400 text-sm hover:text-orange-500 transition-colors"
              >
                info@funholidays.lk
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MdPhone className="text-gray-400 text-lg shrink-0" />
              <a
                href="tel:+88012334588"
                className="text-gray-400 text-sm hover:text-orange-500 transition-colors"
              >
                +94 114 320 315
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base leading-snug">
            Subscribe Our Newsletter to <br /> get more offer & Tips
          </h4>
          <p className="text-gray-500 text-xs leading-relaxed">
            Stay connected & never miss a deal! subscribe to our newsletter and
            get travel offers
          </p>
          <div className="flex items-center gap-2 mt-1">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-transparent border border-gray-600 text-gray-300 text-xs rounded-lg px-3 py-2.5 outline-none placeholder-gray-600 focus:border-orange-500 transition-colors min-w-0"
            />
            <button className="bg-white hover:bg-gray-200 transition-colors text-gray-900 font-semibold text-xs px-4 py-2.5 rounded-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand logo */}
        {isSafari ? (
          <img
            src="/fun-holidays-logo.png"
            alt="Fun Holidays"
            className="h-[120px] w-[120px] object-contain"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-[120px] w-[120px]"
          >
            <source src="/logo3.webm" type="video/webm" />
          </video>
        )}

        {/* Copyright */}
        <p className="text-gray-500 text-xs text-center sm:text-right whitespace-nowrap">
          @Copy 2026{" "}
          <span className="text-white font-bold">FUNHOLIDAYS</span>, All rights
          reserved
        </p>

        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center shrink-0"
        >
          <FaChevronUp className="text-white text-sm" />
        </button>
      </div>

    </footer>
  );
};

export default Footer;