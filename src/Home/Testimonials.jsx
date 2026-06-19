import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaPlay } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    quote: '"Booking with this agency was the best decision for our Bali trip! from flights to accommodations!"',
    name: "Michael Thompson",
    role: "World traveler",
    avatar: "/images/home/avatar-michael.png",
  },
  {
    id: 2,
    quote: '"An absolutely unforgettable experience. The team handled everything perfectly from start to finish!"',
    name: "Sarah Johnson",
    role: "Adventure seeker",
    avatar: "/images/home/avatar-michael.png",
  },
  {
    id: 3,
    quote: '"Sri Lanka was a dream. Fun Holidays made every detail seamless. Will book again without hesitation!"',
    name: "James Perera",
    role: "Frequent traveler",
    avatar: "/images/home/avatar-michael.png",
  },
];

const galleryImages = [
  { src: "/images/home/testimonial-dolphins.jpg", alt: "Dolphins" },
  { src: "/images/home/testimonial-train.jpg", alt: "Nine Arches Train" },
  { src: "/images/home/testimonial-coast.jpg", alt: "Coastal View" },
  { src: "/images/home/elephants.jpg", alt: "Elephant", hasPlay: true },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const contentRef = useRef(null);
  useScrollReveal(contentRef, 100);

  const current = testimonials[active];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/home/testimonial-bg.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content — single ref on the whole content block */}
      <div
        ref={contentRef}
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20"
      >
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3">
            100k+ Customer Say Us
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Join over 100,000 satisfied travelers who have experienced
          </p>
        </div>

        {/* ── Mobile: stacked ─────────────────────────────── */}
        <div className="flex flex-col lg:hidden gap-8">
          {/* Gallery first on mobile */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl h-[130px] sm:h-[160px] group cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {img.hasPlay && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                      <FaPlay className="text-white text-xs ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Testimonial below */}
          <div>
            <blockquote className="text-white text-lg sm:text-xl font-bold leading-snug mb-6">
              {current.quote}
            </blockquote>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shrink-0"
              />
              <div>
                <p className="text-white font-bold text-sm">{current.name}</p>
                <p className="text-gray-400 text-xs">{current.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 h-2.5 bg-white"
                      : "w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Desktop: side-by-side ───────────────────────── */}
        <div className="hidden lg:flex items-center gap-16">
          {/* Left: Testimonial */}
          <div className="flex-1">
            <blockquote className="text-white text-2xl font-bold leading-snug mb-10">
              {current.quote}
            </blockquote>
            <div className="flex items-center gap-4 mb-10">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-white font-bold text-base">{current.name}</p>
                <p className="text-gray-400 text-sm">{current.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 h-2.5 bg-white"
                      : "w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: 2x2 Grid */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl h-[185px] group cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {img.hasPlay && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                      <FaPlay className="text-white text-sm ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;