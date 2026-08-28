import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageHero from "../common/PageHero";
import useScrollReveal from "../hooks/useScrollReveal";
import { categories, tags } from "../data/blogData";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { submitToWeb3Forms } from "../utils/web3forms";
import useSEO from "../hooks/useSEO";
import { db } from "../firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const SITE_URL = "https://www.funholidays.lk";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  useScrollReveal(contentRef, 100);
  useScrollReveal(sidebarRef, 200);

  const [blog, setBlog]       = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Fetch current post and all posts in parallel
        const [postSnap, listSnap] = await Promise.all([
          getDoc(doc(db, "blogs", slug)),
          getDocs(collection(db, "blogs")),
        ]);
        if (postSnap.exists()) setBlog({ ...postSnap.data(), slug: postSnap.id });
        const list = listSnap.docs
          .map((d) => ({ ...d.data(), slug: d.id }))
          .filter((b) => b.published !== false);
        setAllBlogs(list);
      } catch (err) {
        console.error("Failed to load blog:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  useSEO({
    title: blog
      ? `${blog.title} | Fun Holidays Sri Lanka Travel Blog`
      : "Sri Lanka Travel Blog | Fun Holidays",
    description: blog?.excerpt ||
      "Read expert Sri Lanka travel tips, destination guides & holiday inspiration on the Fun Holidays blog.",
    keywords:
      "Sri Lanka travel blog, Sri Lanka travel tips, Sri Lanka destination guide, " +
      (blog?.tags ? blog.tags.join(", ") : ""),
    canonical: blog ? `${SITE_URL}/blog/${blog.slug}` : `${SITE_URL}/blog`,
    schema: blog
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blog.title,
          description: blog.excerpt,
          image: `${SITE_URL}${blog.image}`,
          url: `${SITE_URL}/blog/${blog.slug}`,
          datePublished: blog.date,
          author: { "@type": "Person", name: blog.author },
          publisher: {
            "@type": "Organization",
            name: "Fun Holidays",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/fun-holidays-logo.png` },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${blog.slug}` },
        }
      : null,
  });

  const [commentForm, setCommentForm] = useState({ name: "", email: "", comment: "" });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentStatus, setCommentStatus] = useState(null);

  const handleCommentChange = (e) =>
    setCommentForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingComment(true);
    setCommentStatus(null);
    try {
      await submitToWeb3Forms({
        subject: `New Blog Comment on "${blog?.title || slug}"`,
        type: "blog-comment",
        from_name: commentForm.name,
        name: commentForm.name,
        email: commentForm.email,
        message: commentForm.comment,
      });
      setCommentStatus({ type: "success", text: "Comment sent! It will be reviewed shortly." });
      setCommentForm({ name: "", email: "", comment: "" });
    } catch (err) {
      setCommentStatus({ type: "error", text: err.message || "Something went wrong. Please try again." });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Blog post not found.</p>
        <Link to="/blog" className="text-orange-500 underline text-sm">Back to Blog</Link>
      </div>
    );
  }

  // Related posts — match by numeric id (seeded data) or by slug (admin-created)
  const related = allBlogs.filter((b) =>
    b.slug !== blog.slug &&
    (blog.relatedPosts || []).some((rp) => rp === b.id || rp === b.slug)
  );

  // Second image (cycle through available posts)
  const secondImagePost = allBlogs.find((b) => b.slug !== blog.slug);

  return (
    <>
      <PageHero
        title="Sri Lanka Travel Blog"
        image={blog.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blog.title },
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
              <Link to="/blog" className="hover:text-orange-500">Blog</Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug mb-3">
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
              <span>· Comments ({blog.comments ?? 0})</span>
            </div>

            {/* Excerpt */}
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{blog.excerpt}</p>

            {/* Hero image */}
            <div className="w-full h-[220px] sm:h-[300px] rounded-2xl overflow-hidden mb-8">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>

            {/* Content blocks */}
            {(blog.content || []).map((block, i) => (
              <div key={i} className="mb-6">
                {block.heading && (
                  <h2 className="text-gray-900 font-bold text-xl sm:text-2xl mb-3">{block.heading}</h2>
                )}
                {block.body && (
                  <p className="text-gray-500 text-sm leading-relaxed">{block.body}</p>
                )}
                {block.quote && (
                  <div className="border-l-4 border-orange-500 bg-gray-50 rounded-r-2xl px-6 py-5 my-6">
                    <div className="flex gap-3 mb-3">
                      <span className="text-orange-500 text-3xl font-serif leading-none">"</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed italic mb-3">{block.quote.text}</p>
                    <p className="text-gray-500 text-xs font-semibold">— {block.quote.author}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Second image */}
            {secondImagePost && (
              <div className="w-full h-[220px] sm:h-[280px] rounded-2xl overflow-hidden my-8">
                <img
                  src={secondImagePost.image}
                  alt={`More about ${blog.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="mb-10">
                <h3 className="text-gray-900 font-bold text-base mb-4">Related Posts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((post) => (
                    <div
                      key={post.slug}
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
            )}

            {/* Leave a comment form */}
            <div>
              <h3 className="text-gray-900 font-bold text-base mb-2">Leave a Comment</h3>
              <p className="text-gray-400 text-xs mb-5">
                Your email address will not be published. Required fields are marked *
              </p>
              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    name="name" value={commentForm.name} onChange={handleCommentChange}
                    placeholder="Name" required
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                  />
                  <input
                    name="email" type="email" value={commentForm.email} onChange={handleCommentChange}
                    placeholder="Email" required
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300"
                  />
                </div>
                <textarea
                  name="comment" value={commentForm.comment} onChange={handleCommentChange}
                  placeholder="Write your comment" rows={5} required
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400 transition-colors placeholder-gray-300 resize-none"
                />
                <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                  <input type="checkbox" className="accent-orange-500" />
                  Save my name and email for next time I comment.
                </label>
                <button
                  type="submit" disabled={isSubmittingComment}
                  className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold text-sm px-8 py-3 rounded-xl w-fit disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmittingComment ? "Sending..." : "Send Comment"}
                </button>
                {commentStatus && (
                  <p className={`text-xs font-medium ${commentStatus.type === "success" ? "text-green-600" : "text-red-500"}`}>
                    {commentStatus.text}
                  </p>
                )}
              </form>
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
              <h3 className="text-gray-900 font-bold text-base mb-4">Recent Posts</h3>
              <div className="flex flex-col gap-4">
                {allBlogs.slice(0, 3).map((post) => (
                  <div key={post.slug} className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/blog/${post.slug}`)}>
                    <div className="w-16 h-14 rounded-lg overflow-hidden shrink-0">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400 text-[10px]">{post.date}</span>
                      <p className="text-gray-700 text-xs font-medium leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">{post.title}</p>
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
              <img src="/images/home/galle.jpg" alt="Best tourist places in Sri Lanka" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-white font-bold text-base mb-3">Best Tourist Places in Sri Lanka</p>
                <button onClick={() => navigate("/tours")} className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-colors">
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
