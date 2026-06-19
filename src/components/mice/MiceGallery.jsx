import { useRef } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";

const images = [
  {
    src: "/images/mice/gallery-1.jpeg",
    alt: "Group tour at the coast",
    caption: "Groups exploring Sri Lanka's stunning coastlines",
  },
  {
    src: "/images/mice/gallery-2.jpeg",
    alt: "Family watching dolphins",
    caption: "Families enjoying thrilling dolphin-watching experiences",
  },
  {
    src: "/images/mice/gallery-3.jpeg",
    alt: "Group scenic train journey",
    caption: "Corporate groups on the iconic train through tea country",
  },
];

const GalleryCard = ({ src, alt, caption, delay }) => {
  const ref = useRef(null);
  useScrollReveal(ref, delay);
  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden group relative"
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="h-[280px] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
        <p className="text-white text-sm font-medium leading-snug">{caption}</p>
      </div> */}
    </div>
  );
};

const MiceGallery = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 100);

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
            Moments
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mt-2">
            Groups & Families on Tour
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Real memories, real smiles — from corporate teams to family
            reunions, we craft journeys that bring people together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <GalleryCard key={i} {...img} delay={100 + i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiceGallery;
