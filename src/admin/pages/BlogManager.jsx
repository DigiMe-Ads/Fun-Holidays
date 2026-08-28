import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection, getDocs, setDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";

const EMPTY = {
  slug: "", title: "", excerpt: "", category: "Tours & Travel",
  author: "Admin", date: "", shortDate: "", image: "",
  tags: "",         // comma-separated
  content: "",      // JSON string of content blocks
  relatedPosts: "", // comma-separated slugs
  comments: 0,
  published: true,
};

function slugify(s) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const CONTENT_EXAMPLE = JSON.stringify([
  { heading: "Section Title", body: "Paragraph text here." },
  { heading: null, body: "Another paragraph without a heading." },
  { quote: { text: "Quote text here.", author: "Author Name" } },
], null, 2);

export default function BlogManager() {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState(null);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  async function load() {
    setLoading(true);
    const snap = await getDocs(collection(db, "blogs"));
    setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openNew() {
    const today = new Date();
    const dateStr = today.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const shortStr = today.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
    setError("");
    setForm({ ...EMPTY, date: dateStr, shortDate: shortStr });
  }

  function openEdit(b) {
    setError("");
    setForm({
      ...EMPTY,
      ...b,
      tags:         Array.isArray(b.tags) ? b.tags.join(", ") : b.tags || "",
      content:      b.content ? JSON.stringify(b.content, null, 2) : "",
      relatedPosts: Array.isArray(b.relatedPosts) ? b.relatedPosts.join(", ") : b.relatedPosts || "",
    });
  }

  function set(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  async function save(e) {
    e.preventDefault();
    setError("");
    const slug = form.slug || slugify(form.title);
    if (!slug) { setError("Title / slug is required."); return; }

    let content;
    try {
      content = form.content ? JSON.parse(form.content) : [];
    } catch {
      setError("Content JSON is invalid. Please fix the format.");
      return;
    }

    setSaving(true);
    try {
      const isNew = !form.id;
      const data = {
        slug,
        title:        form.title,
        excerpt:      form.excerpt,
        category:     form.category,
        author:       form.author,
        date:         form.date,
        shortDate:    form.shortDate,
        image:        form.image,
        tags:         form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        content,
        relatedPosts: form.relatedPosts.split(",").map((s) => s.trim()).filter(Boolean),
        comments:     Number(form.comments) || 0,
        published:    form.published,
        updatedAt:    serverTimestamp(),
        ...(isNew ? { createdAt: serverTimestamp() } : {}),
      };
      if (isNew) {
        await setDoc(doc(db, "blogs", slug), data);
      } else {
        await updateDoc(doc(db, "blogs", form.id), data);
      }
      setForm(null);
      load();
    } catch (err) {
      setError("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteBlog(id) {
    if (!confirm(`Delete "${id}"?`)) return;
    await deleteDoc(doc(db, "blogs", id));
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Blog Posts</h1>
          <p className="text-gray-400 text-sm">Write and manage your travel blog.</p>
        </div>
        <button onClick={openNew} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-5 py-2.5 rounded-lg text-sm">
          + New Post
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading…</p>
      ) : blogs.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-gray-100">
          <p className="text-gray-400">No blog posts yet. Click "New Post" or use Seed Data.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100 bg-gray-50">
                <th className="px-5 py-3 text-gray-400 font-medium">Title</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Category</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Date</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Status</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-xs truncate">{b.title}</td>
                  <td className="px-5 py-3 text-gray-500">{b.category}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{b.date}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${b.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {b.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => openEdit(b)} className="text-blue-500 hover:text-blue-700 text-xs mr-3">Edit</button>
                    <button onClick={() => deleteBlog(b.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-in form */}
      {form && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setForm(null)} />
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-gray-900">{form.id ? "Edit Post" : "New Blog Post"}</h2>
              <button onClick={() => setForm(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>

            <form onSubmit={save} className="px-6 py-6 space-y-5">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

              <div>
                <label className="label">Title *</label>
                <input value={form.title} onChange={(e) => { set("title", e.target.value); set("slug", slugify(e.target.value)); }} required className="inp" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Slug (auto)</label>
                  <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="inp bg-gray-50" />
                </div>
                <div>
                  <label className="label">Category</label>
                  <input value={form.category} onChange={(e) => set("category", e.target.value)} className="inp" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Author</label>
                  <input value={form.author} onChange={(e) => set("author", e.target.value)} className="inp" />
                </div>
                <div>
                  <label className="label">Date (e.g. "20 August 2025")</label>
                  <input value={form.date} onChange={(e) => { set("date", e.target.value); set("shortDate", e.target.value.replace(/\s\d{4}$/, "")); }} className="inp" />
                </div>
              </div>

              <div>
                <label className="label">Image URL</label>
                <input value={form.image} onChange={(e) => set("image", e.target.value)} className="inp" placeholder="/images/home/blog-image.jpg" />
              </div>

              <div>
                <label className="label">Excerpt / Summary</label>
                <textarea rows={3} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} className="inp" />
              </div>

              <div>
                <label className="label">Tags (comma-separated)</label>
                <input value={form.tags} onChange={(e) => set("tags", e.target.value)} className="inp" placeholder="Travel, Guide, Beach" />
              </div>

              <div>
                <label className="label">Content (JSON)</label>
                <p className="text-xs text-gray-400 mb-1">
                  Each block: {`{heading, body}`} or {`{quote: {text, author}}`}. heading can be null.
                </p>
                <textarea
                  rows={12}
                  value={form.content}
                  onChange={(e) => set("content", e.target.value)}
                  className="inp font-mono text-xs"
                  placeholder={CONTENT_EXAMPLE}
                />
              </div>

              <div>
                <label className="label">Related Posts (comma-separated slugs)</label>
                <input value={form.relatedPosts} onChange={(e) => set("relatedPosts", e.target.value)} className="inp" placeholder="luxury-travel-on-a-budget, guide-to-cultural-travel" />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 accent-yellow-400" />
                <label htmlFor="published" className="text-sm text-gray-700">Published</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-lg text-sm disabled:opacity-60">
                  {saving ? "Saving…" : "Save Post"}
                </button>
                <button type="button" onClick={() => setForm(null)} className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .label { display:block; font-size:0.8125rem; font-weight:500; color:#374151; margin-bottom:0.25rem; }
        .inp   { width:100%; border:1px solid #d1d5db; border-radius:0.5rem; padding:0.625rem 0.875rem; font-size:0.875rem; outline:none; resize:vertical; }
        .inp:focus { border-color:#fbbf24; box-shadow:0 0 0 2px rgba(251,191,36,.25); }
      `}</style>
    </div>
  );
}
