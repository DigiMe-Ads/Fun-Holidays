import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const FeaturedCallouts = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const navigate = useNavigate();

  useScrollReveal(leftRef, 100);
  useScrollReveal(rightRef, 220);

  return (
    <section className="w-full px-3 sm:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── Card 1: Kandy Perahera ───────────────────────── */}
        <div
          ref={leftRef}
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[320px] sm:min-h-[380px]"
          onClick={() => navigate("/destination/the-kandy-perahera")}
        >
          {/* Background image */}
          <img
            src="/images/home/blog-temple.jpg"
            alt="Kandy Perahera"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient overlay — dark bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            {/* Badge */}
            <span className="inline-block bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Featured Activity
            </span>

            <h2 className="text-white text-3xl sm:text-4xl font-extrabold leading-snug mb-3">
              Kandy Perahera —{" "}
              <span className="text-orange-400">
                Sri Lanka's Greatest Cultural Festival
              </span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5 max-w-lg">
              Every July and August for over 400 years, the ancient kingdom of
              Kandy erupts in one of Asia's most spectacular cultural
              celebrations. Magnificent elephants adorned in jewelled costumes,
              fire dancers crackling to the beat of ancient drums, and whip
              dancers creating electricity in the night air — the Kandy Perahera
              is 10 nights of pure Sri Lanka magic. Witnessing it is one of the
              most authentic holiday experiences in Asia.
            </p>

            <button className="flex items-center gap-2 bg-white/10 hover:bg-orange-500 border border-white/30 hover:border-orange-500 backdrop-blur-sm text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all duration-300">
              Learn More About Kandy Perahera
              <FaChevronRight className="text-[10px]" />
            </button>
          </div>
        </div>

        {/* ── Card 2: Best of Sri Lanka Tour ───────────────── */}
        <div
          ref={rightRef}
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[320px] sm:min-h-[380px]"
          onClick={() => navigate("/tours/best-of-sri-lanka-tour")}
        >
          {/* Background image */}
          <img
            src="/images/destination/sigiriya-aerial.jpg"
            alt="Best of Sri Lanka Tour"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            {/* Badge */}
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-white/30">
              Featured Tour Package
            </span>

            <h2 className="text-white text-3xl sm:text-4xl font-extrabold leading-snug mb-3">
              Best of Sri Lanka Tour —{" "}
              <span className="text-orange-400">
                The Classic Island Experience
              </span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-5 max-w-lg">
              From the sacred ruins of Anuradhapura to the world-famous
              Pinnawala Elephant Orphanage, from Sigiriya Rock Fortress to the
              wildlife-rich Yala National Park — this is the definitive 7-day
              Sri Lanka holiday. Our most popular package takes you through the
              very best this extraordinary island has to offer, in the hands of
              our expert Fun Family guides.
            </p>

            {/* Two CTAs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/tours/best-of-sri-lanka-tour");
                }}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                View Full Itinerary
                <FaChevronRight className="text-[10px]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/tours");
                }}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all"
              >
                See All Tour Packages
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCallouts;