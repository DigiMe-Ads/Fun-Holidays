import { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    id: 1,
    image: "/images/home/hero-1.jpg",
    headline: "Ayubowan — Welcome to the Laughing Island",
    subtext:
      "Experience authentic Sri Lanka holiday packages crafted by Asia's most fun travel experts.",
  },
  {
    id: 2,
    image: "/images/home/hero-2.jpg",
    headline: "Heritage & Culture",
    subtext:
      "Explore 8 UNESCO World Heritage Sites and discover 2,500+ years of recorded civilised history on your Sri Lanka cultural holiday.",
  },
  {
    id: 3,
    image: "/images/home/hero-3.jpg",
    headline: "Nature & Adventure",
    subtext:
      "From misty hill country to wildlife-rich national parks — Sri Lanka's hidden natural wonders are yours to discover.",
  },
  {
    id: 4,
    image: "/images/home/hero-4.jpg",
    headline: "Asian Beach Holidays",
    subtext:
      "Sun-kissed sands from Kalpitiya to Mirissa, white sand beaches from Trincomalee to Pasikudah — experience Asia's finest beach holidays on Sri Lanka's stunning coastline.",
  },
  {
    id: 5,
    image: "/images/home/hero-5.jpg",
    headline: "MICE & Corporate Travel",
    subtext:
      "Sri Lanka is Asia's rising MICE destination. Expert DMC services for meetings, incentive travel & conferences.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 350);
  }, []);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
  }, [current, goTo]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [current]);

  const handleDotClick = (i) => {
    if (i === current) return;
    clearInterval(timerRef.current);
    goTo(i);
  };

  const slide = slides[current];

  return (
    <section className="w-full px-3 sm:px-6 py-3 sm:py-4">
      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[620px] overflow-hidden rounded-2xl">

        {/* Background images */}
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.headline}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1a3a4a]/55" />

        {/* Text */}
        <div
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-12"
          style={{
            opacity: animating ? 0 : 1,
            transition: "opacity 0.35s ease",
          }}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-2 sm:mb-3 text-white drop-shadow-md max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            {slide.headline}
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-xs sm:max-w-sm">
            {slide.subtext}
          </p>
        </div>

        {/* Orange dot accent */}
        <div className="hidden sm:block absolute right-8 sm:right-16 top-1/2 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-orange-500 z-10" />

        {/* Clickable dot indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 sm:w-7 sm:h-2.5 bg-white"
                  : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/40 hover:bg-white/70 cursor-pointer"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;