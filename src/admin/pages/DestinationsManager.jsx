import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection, getDocs, setDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import ImageUpload from "../components/ImageUpload";
import GalleryUpload from "../components/GalleryUpload";

const EMPTY = {
  slug: "", title: "", subtitle: "",
  heroImage: "", thumbnail: "",
  gallery: [],      // array of image URLs
  overview: "",     // one paragraph per line
  highlights: "",   // one item per line
  article: "",      // JSON: [{heading, body}, ...]
  toChild: "", toAdult: "",
  showPrice: true,  // false = hide prices, show "Enquire" button instead
  published: true,
};

function toLines(arr) { return Array.isArray(arr) ? arr.join("\n") : arr || ""; }
function fromLines(str) { return str.split("\n").map((s) => s.trim()).filter(Boolean); }
function slugify(s) { return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""); }

export default function DestinationsManager() {
  const [dests, setDests]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(null);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  async function load() {
    setLoading(true);
    const snap = await getDocs(collection(db, "destinations"));
    setDests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openNew() { setError(""); setForm({ ...EMPTY }); }
  function openEdit(d) {
    setError("");
    setForm({
      ...EMPTY, ...d,
      gallery:    Array.isArray(d.gallery) ? d.gallery : (d.gallery || "").split("\n").filter(Boolean),
      overview:   toLines(d.overview),
      highlights: toLines(d.highlights),
      article:    d.article ? JSON.stringify(d.article, null, 2) : "",
      toChild:    d.toChild ?? "",
      toAdult:    d.toAdult ?? "",
      showPrice:  d.showPrice !== false, // default true if field missing
    });
  }

  function set(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  async function save(e) {
    e.preventDefault();
    setError("");
    const slug = form.slug || slugify(form.title);
    if (!slug) { setError("Title / slug is required."); return; }
    let article;
    try {
      article = form.article ? JSON.parse(form.article) : [];
    } catch {
      setError("Article JSON is invalid. Please fix the format.");
      return;
    }

    setSaving(true);
    try {
      const isNew = !form.id;
      const data = {
        slug,
        title:      form.title,
        subtitle:   form.subtitle,
        heroImage:  form.heroImage,
        thumbnail:  form.thumbnail || form.heroImage,
        gallery:    form.gallery,  // already an array
        overview:   fromLines(form.overview),
        highlights: fromLines(form.highlights),
        article,
        toChild:    Number(form.toChild) || 0,
        toAdult:    Number(form.toAdult) || 0,
        showPrice:  form.showPrice,
        published:  form.published,
        updatedAt:  serverTimestamp(),
        ...(isNew ? { createdAt: serverTimestamp() } : {}),
      };
      if (isNew) await setDoc(doc(db, "destinations", slug), data);
      else await updateDoc(doc(db, "destinations", form.id), data);
      setForm(null);
      load();
    } catch (err) {
      setError("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteDest(id) {
    if (!confirm(`Delete "${id}"?`)) return;
    await deleteDoc(doc(db, "destinations", id));
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Destinations</h1>
          <p className="text-gray-400 text-sm">Manage experiences and destination detail pages.</p>
        </div>
        <button onClick={openNew} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-5 py-2.5 rounded-lg text-sm">
          + Add Destination
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading…</p>
      ) : dests.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-gray-100">
          <p className="text-gray-400">No destinations yet. Use Seed Data to populate from existing site content.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100 bg-gray-50">
                <th className="px-5 py-3 text-gray-400 font-medium">Title</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Subtitle</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Pricing (Adult)</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Status</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dests.map((d) => (
                <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{d.title}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{d.subtitle}</td>
                  <td className="px-5 py-3 text-gray-500">{d.toAdult ? `$${d.toAdult}` : "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${d.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {d.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => openEdit(d)} className="text-blue-500 hover:text-blue-700 text-xs mr-3">Edit</button>
                    <button onClick={() => deleteDest(d.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
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
              <h2 className="font-bold text-gray-900">{form.id ? "Edit Destination" : "Add Destination"}</h2>
              <button onClick={() => setForm(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>

            <form onSubmit={save} className="px-6 py-6 space-y-5">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Title *</label>
                  <input value={form.title} onChange={(e) => { set("title", e.target.value); set("slug", slugify(e.target.value)); }} required className="inp" />
                </div>
                <div>
                  <label className="label">Slug (auto)</label>
                  <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className="inp bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="label">Subtitle / tagline</label>
                <input value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} className="inp" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ImageUpload
                  value={form.heroImage}
                  onChange={(url) => set("heroImage", url)}
                  folder="destinations"
                  label="Hero Image"
                />
                <ImageUpload
                  value={form.thumbnail}
                  onChange={(url) => set("thumbnail", url)}
                  folder="destinations"
                  label="Thumbnail"
                />
              </div>

              <GalleryUpload
                value={form.gallery}
                onChange={(urls) => set("gallery", urls)}
                folder="destinations"
                label="Gallery Images"
              />

              <div>
                <label className="label">Overview (one paragraph per line)</label>
                <textarea rows={4} value={form.overview} onChange={(e) => set("overview", e.target.value)} className="inp" />
              </div>

              <div>
                <label className="label">Highlights (one item per line)</label>
                <textarea rows={4} value={form.highlights} onChange={(e) => set("highlights", e.target.value)} className="inp" />
              </div>

              <div>
                <label className="label">Article Sections (JSON)</label>
                <p className="text-xs text-gray-400 mb-1">
                  Format: {`[{"heading": "Section Title", "body": "Paragraph text here."}, ...]`}
                </p>
                <textarea
                  rows={10}
                  value={form.article}
                  onChange={(e) => set("article", e.target.value)}
                  className="inp font-mono text-xs"
                  placeholder={`[\n  {"heading": "About This Experience", "body": "Describe the experience here."},\n  {"heading": "What to Expect", "body": "More detail about what visitors will see and do."}\n]`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Price – Child (USD)</label>
                  <input type="number" value={form.toChild} onChange={(e) => set("toChild", e.target.value)} className="inp" />
                </div>
                <div>
                  <label className="label">Price – Adult (USD)</label>
                  <input type="number" value={form.toAdult} onChange={(e) => set("toAdult", e.target.value)} className="inp" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <input
                    type="checkbox"
                    id="showPrice"
                    checked={form.showPrice !== false}
                    onChange={(e) => set("showPrice", e.target.checked)}
                    className="w-4 h-4 accent-yellow-400 mt-0.5 shrink-0"
                  />
                  <div>
                    <label htmlFor="showPrice" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Show pricing on destination page
                    </label>
                    <p className="text-xs text-gray-400 mt-0.5">
                      When unchecked, visitors see an &ldquo;Enquire About Pricing&rdquo; button
                      that sends you an email enquiry instead of showing the prices above.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="pub" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 accent-yellow-400" />
                  <label htmlFor="pub" className="text-sm text-gray-700">Published</label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-lg text-sm disabled:opacity-60">
                  {saving ? "Saving…" : "Save Destination"}
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
