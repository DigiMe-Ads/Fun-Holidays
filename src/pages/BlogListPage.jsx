import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageHero from "../common/PageHero";
import useScrollReveal from "../hooks/useScrollReveal";
import { blogs, categories, tags } from "../data/blogData";
import { FaChevronRight, FaSearch } from "react-icons/fa";

const BlogListPage = () => {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const sidebarRef = useRef(null);
  useScrollReveal(listRef, 100);
  useScrollReveal(sidebarRef, 200);

  return (
    <>
      <PageHero
        title="Blog"
        image="/images/home/blog-aerial.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog Details" },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Left: Blog list ──────────────────────────── */}
          <div ref={listRef} style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }} className="flex-1">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="mb-10 cursor-pointer group"
                onClick={() => navigate(`/blog/${blog.slug}`)}
              >
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2 text-gray-400 text-xs mb-2">
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-orange-400" />
                    {blog.category}
                  </span>
                  <span>·</span>
                  <span>By {blog.author}</span>
                  <span>·</span>
                  <span>{blog.date}</span>
                  <span>·</span>
                  <span>Comments ({blog.comments})</span>
                </div>

                {/* Title */}
                <h2 className="text-gray-900 font-bold text-lg sm:text-xl leading-snug mb-3 group-hover:text-orange-500 transition-colors">
                  {blog.title}
                </h2>

                {/* Image */}
                <div className="w-full h-[220px] sm:h-[280px] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-3">
                  {blog.excerpt}
                </p>

                <button
                  className="text-orange-500 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  onClick={(e) => { e.stopPropagation(); navigate(`/blog/${blog.slug}`); }}
                >
                  Read More <FaChevronRight className="text-[10px]" />
                </button>

                <div className="w-full h-px bg-gray-100 mt-8" />
              </article>
            ))}

            {/* Pagination */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    n === 1
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-100"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-orange-100 flex items-center justify-center">
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* ── Right: Sidebar ───────────────────────────── */}
          <div
            ref={sidebarRef}
            style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            className="w-full lg:w-72 shrink-0 flex flex-col gap-8"
          >
            {/* Search */}
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 gap-2">
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-300"
              />
              <FaSearch className="text-gray-400 text-sm shrink-0" />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-4">
                Categories
              </h3>
              <ul className="flex flex-col gap-2">
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm text-gray-500 hover:text-orange-500 cursor-pointer transition-colors py-1 border-b border-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <FaChevronRight className="text-[10px] text-orange-400" />
                      {cat.name}
                    </div>
                    <span className="text-xs text-gray-400">({cat.count})</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-4">
                Recent Post
              </h3>
              <div className="flex flex-col gap-4">
                {blogs.slice(0, 3).map((blog) => (
                  <div
                    key={blog.id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => navigate(`/blog/${blog.slug}`)}
                  >
                    <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400 text-[10px]">{blog.date}</span>
                      <p className="text-gray-700 text-xs font-medium leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                        {blog.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs text-gray-500 bg-gray-100 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Promo card */}
            <div className="relative rounded-2xl overflow-hidden h-52">
              <img
                src="/images/home/galle.jpg"
                alt="Best Tourist Place"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-bold text-base mb-3">
                  Best Tourist Place
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-colors">
                  Explore Tours
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListPage;