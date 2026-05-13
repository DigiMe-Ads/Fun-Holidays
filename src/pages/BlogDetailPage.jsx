import { useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageHero from "../common/PageHero";
import useScrollReveal from "../hooks/useScrollReveal";
import { blogs, categories, tags } from "../data/blogData";
import { FaChevronRight, FaSearch, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.slug === slug);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  useScrollReveal(contentRef, 100);
  useScrollReveal(sidebarRef, 200);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Blog post not found.</p>
        <Link to="/blog" className="text-orange-500 underline text-sm">Back to Blog</Link>
      </div>
    );
  }

  const related = blogs.filter((b) => blog.relatedPosts.includes(b.id));

  return (
    <>
      <PageHero
        title="Blog"
        image={blog.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Single Blog" },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Left: Article ────────────────────────────── */}
          <div ref={contentRef} style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }} className="flex-1">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <Link to="/" className="hover:text-orange-500">Home</Link>
              <FaChevronRight className="text-[8px]" />
              <Link to="/blog" className="hover:text-orange-500">Single blog</Link>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-3">
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 text-gray-400 text-xs mb-5">
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-orange-400" />
                {blog.category}
              </span>
              <span>· By {blog.author}</span>
              <span>· {blog.date}</span>
              <span>· Comments ({blog.comments})</span>
            </div>

            {/* Excerpt */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {blog.excerpt}
            </p>

            {/* Hero image */}
            <div className="w-full h-[220px] sm:h-[300px] rounded-2xl overflow-hidden mb-8">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>

            {/* Content blocks */}
            {blog.content.map((block, i) => (
              <div key={i} className="mb-6">
                {block.heading && (
                  <h2 className="text-gray-900 font-bold text-base sm:text-lg mb-3">
                    {block.heading}
                  </h2>
                )}
                {block.body && (
                  <p className="text-gray-500 text-sm leading-relaxed">{block.body}</p>
                )}
                {block.quote && (
                  <div className="border-l-4 border-orange-500 bg-gray-50 rounded-r-2xl px-6 py-5 my-6">
                    <div className="flex gap-3 mb-3">
                      <span className="text-orange-500 text-3xl font-serif leading-none">"</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed italic mb-3">
                      {block.quote.text}
                    </p>
                    <p className="text-gray-500 text-xs font-semibold">
                      — {block.quote.author}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Second image */}
            <div className="w-full h-[220px] sm:h-[280px] rounded-2xl overflow-hidden my-8">
              <img
                src={blogs[(blog.id % blogs.length)].image}
                alt="secondary"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags + Share */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 border-t border-b border-gray-100 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500 text-xs font-semibold">Tags:</span>
                {blog.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full hover:bg-orange-500 hover:text-white cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs font-semibold">Share</span>
                {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                  <button key={i} className="text-gray-400 hover:text-orange-500 transition-colors">
                    <Icon className="text-sm" />
                  </button>
                ))}
              </div>
            </div>

            {/* Author card */}
            <div className="bg-[#1a1a1a] rounded-2xl p-5 sm:p-6 flex gap-4 mb-10">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-orange-500">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="author"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm mb-0.5">Richard M. Fudge</p>
                <p className="text-gray-400 text-xs mb-2">Author</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">
                  "I've worked with many agencies, but this one stands out! personalised approach and attention to detail made our honeymoon unforgettable."
                </p>
                <div className="flex gap-3">
                  {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                    <button key={i} className="text-gray-500 hover:text-orange-500 transition-colors">
                      <Icon className="text-xs" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <div className="mb-10">
              <h3 className="text-gray-900 font-bold text-base mb-4">Related post</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((post) => (
                  <div
                    key={post.id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400 text-[10px]">{post.date}</span>
                      <p className="text-gray-700 text-xs font-medium leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                        {post.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="mb-10">
              <h3 className="text-gray-900 font-bold text-base mb-5">Comments</h3>
              <div className="flex flex-col gap-5">
                {[
                  { name: "Lonnie B. Horwitz", date: "September 25, 2025", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
                  { name: "Jaime B. Wilson", date: "September 25, 2025", avatar: "https://randomuser.me/api/portraits/women/68.jpg", indent: true },
                  { name: "Michael A. Saladin", date: "September 26, 2025", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
                ].map((comment, i) => (
                  <div key={i} className={`flex gap-3 ${comment.indent ? "ml-8 sm:ml-12" : ""}`}>
                    <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-800 font-semibold text-sm">{comment.name}</p>
                        <span className="text-gray-400 text-xs">{comment.date}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed mb-1">
                        Tours and travels play a crucial role in enriching lives by offering unique experiences, cultural exchanges, and the joy of exploration.
                      </p>
                      <button className="text-orange-500 text-xs font-semibold hover:underline">Reply →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave a comment form */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-2">Leave a comments</h3>
              <p className="text-gray-400 text-xs mb-5">
                Your email address will not be published. Required fields are marked *
              </p>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input placeholder="Name" className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300" />
                  <input placeholder="Email" className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300" />
                </div>
                <textarea
                  placeholder="Write comment"
                  rows={5}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300 resize-none"
                />
                <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                  <input type="checkbox" className="accent-orange-500" />
                  Save my name, email, and website in this browser for the next time I comment.
                </label>
                <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm px-8 py-3 rounded-xl w-fit">
                  Send Your Comment
                </button>
              </div>
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
              <input type="text" placeholder="Search" className="flex-1 outline-none text-sm text-gray-600 placeholder-gray-300" />
              <FaSearch className="text-gray-400 text-sm shrink-0" />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-4">Categories</h3>
              <ul className="flex flex-col gap-2">
                {categories.map((cat, i) => (
                  <li key={i} className="flex items-center justify-between text-sm text-gray-500 hover:text-orange-500 cursor-pointer transition-colors py-1 border-b border-gray-50">
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
              <h3 className="text-gray-900 font-bold text-base mb-4">Recent Post</h3>
              <div className="flex flex-col gap-4">
                {blogs.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/blog/${post.slug}`)}>
                    <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400 text-[10px]">{post.date}</span>
                      <p className="text-gray-700 text-xs font-medium leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
                        {post.title}
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
                  <span key={i} className="text-xs text-gray-500 bg-gray-100 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded-full cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Promo card */}
            <div className="relative rounded-2xl overflow-hidden h-52">
              <img src="/images/home/galle.jpg" alt="Best Tourist Place" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-bold text-base mb-3">Best Tourist Place</p>
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

export default BlogDetailPage;