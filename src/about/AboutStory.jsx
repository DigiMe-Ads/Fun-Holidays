import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaPlay } from "react-icons/fa";

const AboutStory = () => {
  const [playing, setPlaying] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const videoRef = useRef(null);

  useScrollReveal(leftRef, 100);
  useScrollReveal(rightRef, 250);
  useScrollReveal(videoRef, 150);

  return (
    <>
      {/* ── Top: Text + Image ─────────────────────────────────────────── */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Left: Text */}
          <div
            ref={leftRef}
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
                The Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless. The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with Smeless.
              </p>
              <p>
                The Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless The
                Tower Bridge of London is one of the city's most iconic
                landmarks, blending Victorian engineering with timeless.
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
            className="w-full lg:w-[280px] shrink-0 h-[450px] rounded-2xl overflow-hidden"
          >
            <img
              src="/images/about/story-path.jpg"
              alt="Scenic brick path"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Bottom: Full-bleed video banner ───────────────────────────── */}
      <section
        ref={videoRef}
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        className="relative w-full"
      >
        {/* Background / video */}
        <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden">
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
              {/* Play button */}
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

        {/* Dark label bar below video */}
        <div className="w-full bg-[#1a1a1a] py-5 px-4 text-center">
          <p className="text-white text-xl sm:text-2xl font-semibold tracking-wide">
            Unlimited Travel Experience
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutStory;