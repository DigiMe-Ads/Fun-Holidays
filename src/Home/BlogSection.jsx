import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaChevronRight } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    date: "18 August",
    category: "Tours & travel",
    title: "Highlight trending destinations and why they're worth exploring.",
    image: "/images/home/blog-rafting.jpg",
  },
  {
    id: 2,
    date: "20 August",
    category: "Tours & travel",
    title: "Tips on itinerary planning, booking, and travel hacks.",
    image: "/images/home/blog-aerial.jpg",
  },
  {
    id: 3,
    date: "23 August",
    category: "Tours & travel",
    title: "Focus on destinations that has wild life",
    image: "/images/home/blog-monkey.jpg",
  },
  {
    id: 4,
    date: "24 August",
    category: "Tours & travel",
    title: "Guide to religion travel",
    image: "/images/home/blog-temple.jpg",
  },
];

const BlogCard = ({ blog, index }) => {
  const cardRef = useRef(null);
  useScrollReveal(cardRef, index * 120);

  return (
    <article
      ref={cardRef}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
      className="flex flex-col gap-3 group cursor-pointer"
    >
      {/* Image with date badge */}
      <div className="relative w-full h-[300px] rounded-2xl overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Date badge — top right */}
        <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
          {blog.date}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1.5 px-1">
        {/* Category */}
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <span className="text-gray-500 text-xs">{blog.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-orange-500 transition-colors">
          {blog.title}
        </h3>

        {/* Read More */}
        <button className="flex items-center gap-1 text-gray-700 text-xs font-medium hover:text-orange-500 transition-colors mt-1 w-fit">
          Read More
          <FaChevronRight className="text-[10px]" />
        </button>
      </div>
    </article>
  );
};

const BlogSection = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 0);

  return (
    <section className="w-full px-6 py-14">
      {/* Heading */}
      <div
        ref={headingRef}
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Read Our Latest News & Blog
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, i) => (
          <BlogCard key={blog.id} blog={blog} index={i} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;