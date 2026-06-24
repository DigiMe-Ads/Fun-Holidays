import { useRef } from "react";
import { FaPlane, FaMapMarkerAlt, FaPassport } from "react-icons/fa";
import useScrollReveal from "../../hooks/useScrollReveal";

const routes = [
  { city: "Mumbai", time: "~2.5 hrs", countryCode: "in" },
  { city: "Delhi", time: "~3 hrs", countryCode: "in" },
  { city: "Dubai", time: "~4 hrs", countryCode: "ae" },
  { city: "Singapore", time: "~3.5 hrs", countryCode: "sg" },
  { city: "Bangkok", time: "~3 hrs", countryCode: "th" },
  { city: "Kuala Lumpur", time: "~3 hrs", countryCode: "my" },
  { city: "Paris", time: "~10 hrs", countryCode: "fr" },
  { city: "London", time: "~11 hrs", countryCode: "gb" },
];

const AccessPoint = ({ icon, title, desc }) => (
  <div className="flex gap-4 items-start">
    <div className="mt-0.5 shrink-0">{icon}</div>
    <div>
      <h4 className="text-gray-900 font-semibold text-sm mb-1">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const MiceAccess = () => {
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useScrollReveal(headingRef, 100);
  useScrollReveal(leftRef, 150);
  useScrollReveal(rightRef, 250);

  return (
    <section className="w-full bg-[#fdf6f0] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={headingRef}
          className="text-center mb-12"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">
            Connectivity
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mt-2">
            Easy Regional & International Access
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Bandaranaike International Airport connects Colombo to major hubs
            across Asia, the Middle East, and Europe — making delegate travel
            effortless and time-efficient.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div
            ref={leftRef}
            className="flex-1 flex flex-col gap-6"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <AccessPoint
              icon={<FaPlane className="text-orange-500 text-xl" />}
              title="Direct Flight Connections"
              desc="SriLankan Airlines and 30+ international carriers operate direct routes to Colombo from key MICE source markets across Asia, Europe, and the Middle East."
            />
            <AccessPoint
              icon={<FaMapMarkerAlt className="text-orange-500 text-xl" />}
              title="Central Geographic Position"
              desc="Strategically positioned in the Indian Ocean, Sri Lanka sits within a 4-hour flight radius of major South and Southeast Asian business cities."
            />
            <AccessPoint
              icon={<FaPassport className="text-orange-500 text-xl" />}
              title="Hassle-Free Entry"
              desc="ETA (Electronic Travel Authorization) is available online for most nationalities, with on-arrival visa facilities and streamlined group clearance procedures."
            />
          </div>

          <div
            ref={rightRef}
            className="flex-1"
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h3 className="text-gray-900 font-semibold text-base mb-4">
              Approximate flight times to Colombo
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {routes.map((r, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm"
                >
                  <span
                    className={`fi fi-${r.countryCode} rounded text-2xl`}
                  ></span>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">{r.city}</p>
                    <p className="text-gray-400 text-xs">{r.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiceAccess;
