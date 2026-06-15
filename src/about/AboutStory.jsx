import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaPlay } from "react-icons/fa";

const values = [
  {
    title: "WE ARE FUN",
    icon: "/images/about/fun-icon.png",
    description:
      "We understand that packaged tours can feel repetitive and mundane — but this will never happen with us. Our priority is to ensure every guest has genuine fun, and when our guests are happy, so are we. We go the extra mile — every time. Explore Sri Lanka with the Fun Family and experience what a holiday really should feel like.",
  },
  {
    title: "WE ARE FLEXIBLE",
    icon: "/images/about/flexible-icon.png",
    description:
      "Want to spend an extra day in Nuwara Eliya? That is completely fine with us. We understand that holidays rarely go exactly to plan — and we believe that flexibility is not just a nice-to-have, it is essential. Whether you are on a packaged tour or a completely tailor-made holiday, we adapt around you. Your happiness comes first.",
  },
  {
    title: "WE ARE RELIABLE",
    icon: "/images/about/relaiable-icon.png",
    description:
      "Having fun does not mean being unreliable — it means being fun AND reliable. We ensure your itinerary flows exactly as you want it to, every time. Our team's experience, local knowledge, and genuine commitment to your wellbeing means you can trust us completely to deliver a memorable, safe, and seamless Sri Lanka holiday.",
  },
  {
    title: "WE ARE EXPERTS",
    icon: "/images/about/experts-icon.png",
    description:
      "Our team brings over 25 years of combined experience in the Sri Lanka tourism industry. We understand the island's seasons, its hidden destinations, its culture, and its logistics better than almost anyone. Our expertise spans leisure tourism, honeymoon packages, family holidays, wildlife safaris, cultural heritage tours, and MICE travel.",
  },
];

const AboutStory = () => {
  const [playing, setPlaying] = useState(false);
  const introRef = useRef(null);
  const valuesRef = useRef(null);
  const missionRef = useRef(null);
  const videoRef = useRef(null);

  useScrollReveal(introRef, 100);
  useScrollReveal(valuesRef, 200);
  useScrollReveal(missionRef, 150);
  useScrollReveal(videoRef, 150);

  return (
    <>
      {/* ── Intro: Text + Image ──────────────────────────────────── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div
            ref={introRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="flex-1"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug mb-6">
              Passionate About Your <br />
              Adventures With{" "}
              <span className="text-orange-500">Fun Holidays</span>
            </h2>
            <div className="flex flex-col gap-5 text-gray-500 text-sm leading-relaxed">
              <p>
                Welcome to Fun Holidays — a fresh, innovative breed among Sri
                Lanka's leading Destination Management Companies. We are a team
                of experienced, passionate travel professionals who love what we
                do, love this extraordinary island, and love making sure our
                guests have the time of their lives.
              </p>
              <p>
                We call ourselves the Fun Family. It is not a marketing phrase —
                it is our entire philosophy. We believe that truly extraordinary
                Sri Lanka holidays are built on four things: being fun, being
                flexible, being reliable, and being genuine experts. These are
                not values we talk about. They are values we demonstrate on
                every tour, for every guest, every single day.
              </p>
              <p>
                With over 25 years of combined experience in the Sri Lanka
                tourism industry, our team has an intimate knowledge of this
                island that goes far beyond the guidebook highlights. We know
                the best time to be at Minneriya for the Elephant Gathering at
                its most dramatic. We know which local family in Negombo serves
                the most authentic Sri Lankan lunch. We know the hidden trail in
                Ella that leads to a viewpoint most tourists never find.
              </p>
              <p>
                We are proud to promote sustainable eco-tourism practices that
                protect Sri Lanka's extraordinary natural environment and support
                local communities. When you travel with Fun Holidays, you travel
                with a company that genuinely cares about the island it calls
                home.
              </p>
            </div>
          </div>

          <div
            ref={(el) => {
              if (el) {
                el.style.opacity = "0";
                el.style.transform = "translateY(24px)";
                const observer = new IntersectionObserver(
                  ([entry]) => {
                    if (entry.isIntersecting) {
                      setTimeout(() => {
                        el.style.opacity = "1";
                        el.style.transform = "translateY(0)";
                        el.style.transition =
                          "opacity 0.6s ease, transform 0.6s ease";
                      }, 280);
                      observer.disconnect();
                    }
                  },
                  { threshold: 0.15 }
                );
                observer.observe(el);
              }
            }}
            className="w-full lg:w-[280px] shrink-0 h-[420px] rounded-2xl overflow-hidden"
          >
            <img
              src="/images/destination/hero.jpg"
              alt="Sri Lanka scenic path"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Values: 4 pillars ────────────────────────────────────── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-14">
        <div
          ref={valuesRef}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Icon */}
                <div className="w-24 h-24 mb-6 flex items-center justify-center">
                  <img
                    src={v.icon}
                    alt={v.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Orange divider */}
                <div className="w-10 h-0.5 bg-orange-500 mb-5" />

                {/* Title */}
                <h3 className="text-gray-900 font-black text-lg tracking-widest uppercase mb-4">
                  {v.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ─────────────────────────────────────── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-14">
        <div
          ref={missionRef}
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {/* Vision */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-orange-500/10" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-orange-500/5" />
            <span className="text-orange-500 text-xs font-black uppercase tracking-widest">
              Our Vision
            </span>
            {/* <h3 className="text-white font-extrabold text-xl leading-snug">
              Sri Lanka's Most Trusted Travel Partner
            </h3> */}
            <div className="w-10 h-0.5 bg-orange-500" />
            <p className="text-gray-400 text-sm leading-relaxed">
              To be Sri Lanka's most trusted and preferred travel partner —
              delivering fun, flexible, reliable, and expert holiday experiences
              for guests from around the world through our passionate,
              professional Fun Family team.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-orange-500 rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/5" />
            <span className="text-white/80 text-xs font-black uppercase tracking-widest">
              Our Mission
            </span>
            {/* <h3 className="text-white font-extrabold text-xl leading-snug">
              Unforgettable Sri Lanka Experiences
            </h3> */}
            <div className="w-10 h-0.5 bg-white/50" />
            <p className="text-white/90 text-sm leading-relaxed">
              To create unforgettable Sri Lanka experiences — whether a family
              holiday, a romantic honeymoon, a cultural heritage tour, a
              wildlife safari adventure, or a world-class MICE event — that
              leave every guest wanting to return.
            </p>
          </div>
        </div>
      </section>

      {/* ── Full-bleed video banner ───────────────────────────────── */}
      {/* <section
        ref={videoRef}
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        className="relative w-full"
      >
        <div className="relative w-full h-[280px] sm:h-[380px] overflow-hidden">
          {playing ? (
            <video
              src="/images/about/story-video.mp4"
              autoPlay
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <img
                src="/images/about/story-video.jpg"
                alt="Sri Lanka coast"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setPlaying(true)}
                  className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center shadow-xl"
                >
                  <FaPlay className="text-white text-base ml-1" />
                </button>
              </div>
            </>
          )}
        </div>
        <div className="w-full bg-[#1a1a1a] py-5 px-4 text-center">
          <p className="text-white text-lg sm:text-2xl font-semibold tracking-wide">
            Unlimited Travel Experience
          </p>
        </div>
      </section> */}
    </>
  );
};

export default AboutStory;