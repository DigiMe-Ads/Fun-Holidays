import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection, getDocs, setDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import ImageUpload from "../components/ImageUpload";

const EMPTY = {
  slug: "", title: "", duration: "", image: "", heroImage: "",
  description: "", tagline: "",
  overview: "",      // one paragraph per line
  highlights: "",    // one item per line
  includes: "",      // one item per line
  excludes: "",      // one item per line
  itinerary: "",     // JSON string
  priceChild: "", priceAdult: "",
  published: true,
};

function toLines(arr) {
  return Array.isArray(arr) ? arr.join("\n") : arr || "";
}
function fromLines(str) {
  return str.split("\n").map((s) => s.trim()).filter(Boolean);
}
function slugify(s) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function ToursManager() {
  const [tours, setTours]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(null);   // null = closed, {} = new, {id,...} = editing
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  async function load() {
    setLoading(true);
    const snap = await getDocs(collection(db, "tours"));
    setTours(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openNew() {
    setError("");
    setForm({ ...EMPTY });
  }
  function openEdit(t) {
    setError("");
    setForm({
      ...EMPTY,
      ...t,
      overview:   toLines(t.overview),
      highlights: toLines(t.highlights),
      includes:   toLines(t.includes),
      excludes:   toLines(t.excludes),
      itinerary:  t.itinerary ? JSON.stringify(t.itinerary, null, 2) : "",
      priceChild: t.price?.child ?? "",
      priceAdult: t.price?.adult ?? "",
    });
  }

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function save(e) {
    e.preventDefault();
    setError("");
    const slug = form.slug || slugify(form.title);
    if (!slug) { setError("Title / slug is required."); return; }

    let itinerary;
    try {
      itinerary = form.itinerary ? JSON.parse(form.itinerary) : [];
    } catch {
      setError("Itinerary JSON is invalid. Please fix the format.");
      return;
    }

    setSaving(true);
    try {
      const isNew = !form.id;
      const data = {
        slug,
        title:       form.title,
        duration:    form.duration,
        image:       form.image,
        heroImage:   form.heroImage || form.image,
        description: form.description,
        tagline:     form.tagline,
        overview:    fromLines(form.overview),
        highlights:  fromLines(form.highlights),
        includes:    fromLines(form.includes),
        excludes:    fromLines(form.excludes),
        itinerary,
        price:       { child: Number(form.priceChild) || 0, adult: Number(form.priceAdult) || 0 },
        published:   form.published,
        updatedAt:   serverTimestamp(),
        ...(isNew ? { createdAt: serverTimestamp() } : {}),
      };
      if (isNew) {
        await setDoc(doc(db, "tours", slug), data);
      } else {
        await updateDoc(doc(db, "tours", form.id), data);
      }
      setForm(null);
      load();
    } catch (err) {
      setError("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteTour(id) {
    if (!confirm(`Delete "${id}"? This cannot be undone.`)) return;
    await deleteDoc(doc(db, "tours", id));
    load();
  }

  const ITINERARY_EXAMPLE = JSON.stringify([
    { day: 1, title: "Arrival", activities: ["Check in to hotel", "Evening beach walk"] },
    { day: 2, title: "Day title", activities: ["Activity 1", "Activity 2"] }
  ], null, 2);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Tours</h1>
          <p className="text-gray-400 text-sm">Manage your tour packages.</p>
        </div>
        <button
          onClick={openNew}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-5 py-2.5 rounded-lg text-sm"
        >
          + Add Tour
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400 text-sm">Loading…</p>
      ) : tours.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-gray-100">
          <p className="text-gray-400">No tours yet. Click "Add Tour" or use Seed Data to populate from existing site data.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-100 bg-gray-50">
                <th className="px-5 py-3 text-gray-400 font-medium">Title</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Duration</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Status</th>
                <th className="px-5 py-3 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{t.title}</td>
                  <td className="px-5 py-3 text-gray-500">{t.duration}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {t.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button onClick={() => openEdit(t)} className="text-blue-500 hover:text-blue-700 text-xs mr-3">Edit</button>
                    <button onClick={() => deleteTour(t.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-in form panel */}
      {form && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setForm(null)} />
          <div className="w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-gray-900">{form.id ? "Edit Tour" : "Add Tour"}</h2>
              <button onClick={() => setForm(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>

            <form onSubmit={save} className="px-6 py-6 space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
              )}

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
                <label className="label">Duration (e.g. "4 Nights / 5 Days")</label>
                <input value={form.duration} onChange={(e) => set("duration", e.target.value)} className="inp" />
              </div>

              <div>
                <label className="label">Short Description (card)</label>
                <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className="inp" />
              </div>

              <div>
                <label className="label">Tagline</label>
                <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className="inp" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <ImageUpload
                  value={form.image}
                  onChange={(url) => set("image", url)}
                  folder="tours"
                  label="Card Image"
                />
                <ImageUpload
                  value={form.heroImage}
                  onChange={(url) => set("heroImage", url)}
                  folder="tours"
                  label="Hero Image"
                />
              </div>

              <div>
                <label className="label">Overview (one paragraph per line)</label>
                <textarea rows={4} value={form.overview} onChange={(e) => set("overview", e.target.value)} className="inp" placeholder="Paragraph 1&#10;Paragraph 2" />
              </div>

              <div>
                <label className="label">Highlights (one item per line)</label>
                <textarea rows={4} value={form.highlights} onChange={(e) => set("highlights", e.target.value)} className="inp" placeholder="Visit Sigiriya Rock&#10;Yala Safari" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Includes (one per line)</label>
                  <textarea rows={4} value={form.includes} onChange={(e) => set("includes", e.target.value)} className="inp" />
                </div>
                <div>
                  <label className="label">Excludes (one per line)</label>
                  <textarea rows={4} value={form.excludes} onChange={(e) => set("excludes", e.target.value)} className="inp" />
                </div>
              </div>

              <div>
                <label className="label">Itinerary (JSON)</label>
                <p className="text-xs text-gray-400 mb-1">Format: {`[{day, title, activities:[...]}, ...]`}</p>
                <textarea
                  rows={8}
                  value={form.itinerary}
                  onChange={(e) => set("itinerary", e.target.value)}
                  className="inp font-mono text-xs"
                  placeholder={ITINERARY_EXAMPLE}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Price – Child (USD)</label>
                  <input type="number" value={form.priceChild} onChange={(e) => set("priceChild", e.target.value)} className="inp" />
                </div>
                <div>
                  <label className="label">Price – Adult (USD)</label>
                  <input type="number" value={form.priceAdult} onChange={(e) => set("priceAdult", e.target.value)} className="inp" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 accent-yellow-400" />
                <label htmlFor="published" className="text-sm text-gray-700">Published (visible on site)</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-lg text-sm disabled:opacity-60">
                  {saving ? "Saving…" : "Save Tour"}
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
