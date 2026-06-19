import { useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import useScrollReveal from "../../hooks/useScrollReveal";

const videos = [
  "/images/mice/video-1.mp4",
  "/images/mice/video-2.mp4",
  "/images/mice/video-3.mp4",
  "/images/mice/video-4.mp4",
];

const VideoCard = ({ src, delay }) => {
  const ref = useRef(null);
  useScrollReveal(ref, delay);

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden bg-black"
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <video
        src={src}
        controls
        className="w-full h-[300px] object-cover"
        preload="metadata"
      />
    </div>
  );
};

const TextTestimonial = () => {
  const ref = useRef(null);
  useScrollReveal(ref, 200);

  return (
    <div
      ref={ref}
      className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-start gap-6"
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      <div className="text-orange-500 text-3xl shrink-0">
        <FaQuoteLeft />
      </div>
      <div>
        <p className="text-white text-base leading-relaxed italic">
          "Hi Nali, I just want to thank you for your help with organising
          everything, the trip went well and everyone was really happy!"
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            Q
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Qaisara & Family</p>
            <p className="text-gray-400 text-xs">Malaysia</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MiceTestimonials = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 100);

  return (
    <section className="w-full bg-[#1a1a1a] py-16">
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
            Testimonials
          </span>
          <h2 className="text-5xl sm:text-6xl font-bold text-white mt-2">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
            Don't take our word for it — hear directly from the groups and
            families who have experienced Sri Lanka with us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {videos.map((src, i) => (
            <VideoCard key={i} src={src} delay={100 + i * 100} />
          ))}
        </div>

        <TextTestimonial />
      </div>
    </section>
  );
};

export default MiceTestimonials;
