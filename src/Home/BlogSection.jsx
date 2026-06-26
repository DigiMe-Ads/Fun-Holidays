import { useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { blogs } from "../data/blogData";

const BlogCard = ({ blog, index }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  useScrollReveal(cardRef, index * 120);

  return (
    <article
      ref={cardRef}
      style={{ opacity: 0, transform: "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
      className="flex flex-col gap-3 group cursor-pointer"
      onClick={() => navigate(`/blog/${blog.slug}`)}
    >
      <div className="relative w-full h-[200px] rounded-2xl overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
          {blog.shortDate}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <span className="text-gray-500 text-xs">{blog.category}</span>
        </div>
        <h3 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-orange-500 transition-colors">
          {blog.title}
        </h3>
        <button className="flex items-center gap-1 text-gray-700 text-xs font-medium hover:text-orange-500 transition-colors mt-1 w-fit">
          Read More <FaChevronRight className="text-[10px]" />
        </button>
      </div>
    </article>
  );
};

const BlogSection = () => {
  const headingRef = useRef(null);
  useScrollReveal(headingRef, 0);

  return (
    <section className="w-full px-4 sm:px-6 py-14">
      <div ref={headingRef} style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }} className="text-center mb-10">
        <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900">
          Read Our Latest  News and Blog
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog, i) => (
          <BlogCard key={blog.id} blog={blog} index={i} />
        ))}
      </div>
    </section>
  );
};

export default BlogSection;