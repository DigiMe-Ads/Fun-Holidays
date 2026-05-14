import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import PageHero from "../common/PageHero";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const highlights = [
  "Professional English-speaking guide throughout",
  "Air-conditioned private transport",
  "24/7 Fun Family support from arrival to departure",
  "Flexible itinerary — change as you go",
  "Insider access to hidden destinations",
  "Private experiences arranged on request",
];

const TailorMakePage = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  useScrollReveal(leftRef, 100);
  useScrollReveal(rightRef, 220);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    adults: "",
    children: "",
    infants: "",
    arrivalDate: "",
    nights: "",
    requirements: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will respond to your enquiry within 24 hours.");
    setForm({
      name: "", email: "", phone: "", address: "", country: "",
      adults: "", children: "", infants: "", arrivalDate: "",
      nights: "", requirements: "",
    });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300 bg-white";
  const labelClass = "text-gray-600 text-xs font-medium mb-1 block";

  return (
    <>
    

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── Left: Info ───────────────────────────────── */}
          <div
            ref={leftRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="flex-1 flex flex-col gap-8"
          >
            {/* Heading */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug mb-4">
                Tailor Made Sri Lanka Holidays —{" "}
                <span className="text-orange-500">
                  Your Perfect Trip, Built Around You
                </span>
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                No two travellers are exactly alike — and no two Fun Holidays
                tailor made tours are ever the same. Whether you are planning a
                solo adventure, a romantic couples holiday, a multigenerational
                family trip, or a corporate MICE incentive programme, we build
                your Sri Lanka experience from the ground up, around exactly
                what you want.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Complete the form and our expert Fun Family team will craft a
                completely personalised itinerary for you. We respond to all
                enquiries within{" "}
                <span className="text-orange-500 font-semibold">24 hours</span>.
              </p>
            </div>

            {/* What's included */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-gray-900 font-bold text-base mb-4">
                Every Tailor Made Package Includes
              </h3>
              <div className="flex flex-col gap-2.5">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <FaCheck className="text-orange-500 text-xs mt-1 shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              <h3 className="text-gray-900 font-bold text-base">
                Prefer to Talk to Us?
              </h3>
              <a
                href="tel:+94114320315"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors">
                  <MdPhone className="text-orange-500 group-hover:text-white text-lg transition-colors" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Call Us</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    +94 114 320 315
                  </p>
                </div>
              </a>
              <a
                href="mailto:info@funholidays.lk"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-500 transition-colors">
                  <MdEmail className="text-orange-500 group-hover:text-white text-lg transition-colors" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Email Us</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    info@funholidays.lk
                  </p>
                </div>
              </a>
            </div>

            {/* Image */}
            <div className="w-full h-[220px] rounded-2xl overflow-hidden">
              <img
                src="/images/destination/elephants-gather.jpg"
                alt="Sri Lanka experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── Right: Form ──────────────────────────────── */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="w-full lg:w-[480px] shrink-0"
          >
            <div className="border border-gray-200 rounded-2xl p-6 sm:p-8">
              <h2 className="text-gray-900 font-bold text-lg mb-1">
                Start Planning Your Holiday
              </h2>
              <p className="text-gray-400 text-xs mb-6">
                Fill in your details and we'll build your perfect Sri Lanka
                itinerary. Fields marked * are required.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Phone + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 890"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Country *</label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className={labelClass}>Address</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your address (optional)"
                    className={inputClass}
                  />
                </div>

                {/* Travellers */}
                <div>
                  <label className={labelClass}>Number of Travellers</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <input
                        name="adults"
                        type="number"
                        min="0"
                        value={form.adults}
                        onChange={handleChange}
                        placeholder="Adults"
                        className={inputClass}
                      />
                      <p className="text-gray-400 text-[10px] mt-1 px-1">Adults</p>
                    </div>
                    <div>
                      <input
                        name="children"
                        type="number"
                        min="0"
                        value={form.children}
                        onChange={handleChange}
                        placeholder="Children"
                        className={inputClass}
                      />
                      <p className="text-gray-400 text-[10px] mt-1 px-1">Children (4–12)</p>
                    </div>
                    <div>
                      <input
                        name="infants"
                        type="number"
                        min="0"
                        value={form.infants}
                        onChange={handleChange}
                        placeholder="Infants"
                        className={inputClass}
                      />
                      <p className="text-gray-400 text-[10px] mt-1 px-1">Infants (1–4)</p>
                    </div>
                  </div>
                </div>

                {/* Arrival + Nights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Expected Arrival Date</label>
                    <input
                      name="arrivalDate"
                      type="date"
                      value={form.arrivalDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Number of Nights</label>
                    <input
                      name="nights"
                      type="number"
                      min="1"
                      value={form.nights}
                      onChange={handleChange}
                      placeholder="e.g. 7"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <label className={labelClass}>
                    Your Requirements / Enquiry *
                  </label>
                  <textarea
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    placeholder="Tell us your dream Sri Lanka holiday — destinations, activities, pace, special requests..."
                    rows={5}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 transition-colors text-white font-bold text-sm py-4 rounded-xl mt-1"
                >
                  Submit Enquiry
                </button>

                <p className="text-gray-400 text-xs text-center">
                  We respond to all enquiries within 24 hours. Your details are
                  kept private and never shared.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TailorMakePage;