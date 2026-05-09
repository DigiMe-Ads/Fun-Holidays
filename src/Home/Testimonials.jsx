import { useRef, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaPlay } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    quote:
      '"Booking with this agency was the best decision for our Bali trip! from flights to accommodations!"',
    name: "Michael Thompson",
    role: "World traveler",
    avatar: "/images/home/avatar-michael.png",
  },
  {
    id: 2,
    quote:
      '"An absolutely unforgettable experience. The team handled everything perfectly from start to finish!"',
    name: "Sarah Johnson",
    role: "Adventure seeker",
    avatar: "/images/home/avatar-michael.png",
  },
  {
    id: 3,
    quote:
      '"Sri Lanka was a dream. Fun Holidays made every detail seamless. Will book again without hesitation!"',
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
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useScrollReveal(leftRef, 100);
  useScrollReveal(rightRef, 250);

  const current = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="/images/home/testimonial-bg.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">

        {/* Heading — centered top */}
        <div className="text-center mb-14">
          <h2 className="text-white text-4xl font-bold mb-3">
            100k+ Customer Say Us
          </h2>
          <p className="text-gray-400 text-sm">
            Join over 100,000 satisfied travelers who have experienced
          </p>
        </div>

        {/* Two column layout */}
        <div className="flex items-center gap-16">

          {/* Left: Testimonial */}
          <div
            ref={leftRef}
            className="flex-1"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <blockquote className="text-white text-2xl font-bold leading-snug mb-10">
              {current.quote}
            </blockquote>

            {/* Avatar + Name */}
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

            {/* Dot indicators */}
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

          {/* Right: 2x2 Image Grid */}
          <div
            ref={rightRef}
            className="flex-1 grid grid-cols-2 gap-3"
            style={{
              opacity: 0,
              transform: "translateY(30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
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
                {/* Play button overlay */}
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