import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const CallToAction = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const navigate = useNavigate();

  useScrollReveal(leftRef, 100);
  useScrollReveal(rightRef, 250);

  return (
    <section className="w-full bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-8">

        {/* Left: Image */}
        <div
          ref={leftRef}
          className="w-full md:w-[620px] h-[340px] shrink-0 rounded-2xl overflow-hidden"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <img
            src="/images/mice/hotel.jpg"
            alt="Adventure boat on river"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text */}
        <div
          ref={rightRef}
          className="flex flex-col gap-4 flex-1 text-center md:text-left"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 className="text-white text-5xl sm:text-6xl font-bold leading-tight">
            Adventure is Calling – <br className="hidden sm:block" />
            Are You Ready?
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
            Get ready to embark on unforgettable journeys with us, whether
            you're seeking thrilling adventures, relaxing escapes
          </p>

          <div>
            <button
              onClick={() => navigate("/tours")}
              className="mt-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm px-8 py-3 rounded-lg"
            >
              Explore Our Tours
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CallToAction;