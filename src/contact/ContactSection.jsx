import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { MdEmail, MdAccessTime, MdLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const contactDetails = [
  {
    id: 1,
    icon: MdEmail,
    title: "Email Us",
    lines: ["supportreavio@gmail.com", "www.Funholidays.com"],
  },
  {
    id: 2,
    icon: FaPhone,
    title: "Call Us",
    lines: ["+94 114 320 315", "Available 24/7 hours"],
  },
  {
    id: 3,
    icon: MdAccessTime,
    title: "Working Hours",
    lines: ["Sunday to Friday", "08:00 AM – 06:00 PM"],
  },
  {
    id: 4,
    icon: MdLocationOn,
    title: "Sri Lanka Office",
    lines: ["Colombo", "Sri Lanka"],
  },
];

const ContactSection = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const mapRef = useRef(null);

  useScrollReveal(leftRef, 100);
  useScrollReveal(rightRef, 200);
  useScrollReveal(mapRef, 300);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    comments: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setForm({ fullName: "", phone: "", email: "", subject: "", comments: "" });
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-14">
      {/* ── Top: Left info + Right form ──────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left */}
        <div
          ref={leftRef}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="flex-1"
        >
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3">
            Start Your Adventure <br /> Contact Us Today
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
            Have questions or ready to plan your next adventure? Our travel
            experts are here to guide you every step of the way.
          </p>

          {/* Contact detail grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactDetails.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-orange-500">
                    <Icon className="text-lg" />
                    <span className="text-gray-800 font-semibold text-sm">
                      {item.title}
                    </span>
                  </div>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-gray-400 text-xs pl-6">
                      {line}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div
          ref={rightRef}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="w-full lg:w-[340px] shrink-0"
        >
          <div className="border border-gray-200 rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Row 1: Full Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 text-xs font-medium">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 text-xs font-medium">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                  />
                </div>
              </div>

              {/* Row 2: Email + Subject */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 text-xs font-medium">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    type="email"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-600 text-xs font-medium">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                  />
                </div>
              </div>

              {/* Comments */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-600 text-xs font-medium">
                  Comments
                </label>
                <textarea
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                  placeholder="Type your message"
                  rows={5}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-xs px-6 py-3 rounded-lg w-fit"
              >
                Send Your Reviews
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Map ──────────────────────────────────────────────────── */}
      <div
        ref={mapRef}
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        className="mt-12 w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border border-gray-100"
      >
        <iframe
          title="Fun Holidays Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.0!2d144.9631!3d-37.8136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ4JzQ5LjAiUyAxNDTCsDU3JzQ3LjIiRQ!5e0!3m2!1sen!2slk!4v1600000000000!5m2!1sen!2slk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default ContactSection;