import { useRef } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const clients = [
  {
    name: "Religare Health Insurance",
    country: "India",
    logo: "/images/mice/religare.png",
    type: "Corporate Incentive",
  },
  {
    name: "Tata Stryder",
    country: "India",
    logo: "/images/mice/tata-stryder.png",
    type: "Corporate Event",
  },
  {
    name: "Cheva Santé Animale",
    country: "France",
    logo: "/images/mice/ceva.png",
    type: "International Conference",
  },
  {
    name: "Sri Lanka Tennis Association / ITF",
    country: "Sri Lanka & International",
    logo: "/images/mice/davis-cup.jpg",
    type: "Junior Davis Cup by BNP Paribas",
  },
  {
    name: "Nuance",
    country: "India",
    logo: "/images/mice/nuance.png",
    type: "Corporate Incentive",
  },
];

const ClientCard = ({ name, country, logo, type, delay }) => {
  const ref = useRef(null);
  useScrollReveal(ref, delay);
  return (
    <div
      ref={ref}
      className="border border-gray-100 rounded-2xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow duration-300"
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0 p-2">
        <img src={logo} alt={name} className="w-full h-full object-contain" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug">{name}</h3>
        <p className="text-orange-500 text-xs font-medium mt-1">{type}</p>
        <p className="text-gray-400 text-xs mt-0.5">{country}</p>
      </div>
    </div>
  );
};

const MiceClients = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 100);

  return (
    <section className="w-full bg-white py-16">
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
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            MICE Clients We've Served
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            We have had the privilege of organizing successful MICE events for
            leading corporates, associations, and international organizations
            across multiple industries and countries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c, i) => (
            <ClientCard key={i} {...c} delay={100 + i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiceClients;
