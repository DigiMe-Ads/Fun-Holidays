import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import ImageUpload from "../components/ImageUpload";

const EMPTY = { name: "", role: "", image: "", order: "" };

export default function TeamManager() {
  const [members, setMembers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(null);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");

  async function load() {
    setLoading(true);
    const snap = await getDocs(collection(db, "team"));
    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    setMembers(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openNew() { setError(""); setForm({ ...EMPTY }); }
  function openEdit(m) { setError(""); setForm({ ...m }); }
  function set(key, val) { setForm((f) => ({ ...f, [key]: val })); }

  async function save(e) {
    e.preventDefault();
    if (!form.name.trim()) { setError("Name is required."); return; }
    setSaving(true);
    try {
      const data = {
        name:      form.name.trim(),
        role:      form.role.trim(),
        image:     form.image.trim(),
        order:     Number(form.order) || 99,
        updatedAt: serverTimestamp(),
      };
      if (form.id) {
        await updateDoc(doc(db, "team", form.id), data);
      } else {
        await addDoc(collection(db, "team"), { ...data, createdAt: serverTimestamp() });
      }
      setForm(null);
      load();
    } catch (err) {
      setError("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteMember(id) {
    if (!confirm("Remove this team member?")) return;
    await deleteDoc(doc(db, "team", id));
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Team</h1>
          <p className="text-gray-400 text-sm">Manage travel guides shown on the About page.</p>
        </div>
        <button onClick={openNew} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-5 py-2.5 rounded-lg text-sm">
          + Add Member
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm">Loading…</p>
      ) : members.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center border border-gray-100">
          <p className="text-gray-400">No team members yet. Use Seed Data to populate from existing site content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {members.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center text-center gap-3 shadow-sm">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                {m.image ? (
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{m.name}</p>
                <p className="text-gray-400 text-xs">{m.role}</p>
                <p className="text-gray-300 text-xs">Order: {m.order ?? "—"}</p>
              </div>
              <div className="flex gap-3 mt-auto">
                <button onClick={() => openEdit(m)} className="text-blue-500 hover:text-blue-700 text-xs">Edit</button>
                <button onClick={() => deleteMember(m.id)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-in form */}
      {form && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setForm(null)} />
          <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-gray-900">{form.id ? "Edit Member" : "Add Team Member"}</h2>
              <button onClick={() => setForm(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>

            <form onSubmit={save} className="px-6 py-6 space-y-4">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

              <div>
                <label className="label">Full Name *</label>
                <input value={form.name} onChange={(e) => set("name", e.target.value)} required className="inp" />
              </div>
              <div>
                <label className="label">Role / Title</label>
                <input value={form.role} onChange={(e) => set("role", e.target.value)} className="inp" placeholder="Senior Tour Guide" />
              </div>
              <div>
                <ImageUpload
                  value={form.image}
                  onChange={(url) => set("image", url)}
                  folder="team"
                  label="Photo"
                  shape="circle"
                />
              </div>
              <div>
                <label className="label">Display Order (1 = first)</label>
                <input type="number" value={form.order} onChange={(e) => set("order", e.target.value)} className="inp" placeholder="1" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2.5 rounded-lg text-sm disabled:opacity-60">
                  {saving ? "Saving…" : "Save"}
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
        .inp   { width:100%; border:1px solid #d1d5db; border-radius:0.5rem; padding:0.625rem 0.875rem; font-size:0.875rem; outline:none; }
        .inp:focus { border-color:#fbbf24; box-shadow:0 0 0 2px rgba(251,191,36,.25); }
      `}</style>
    </div>
  );
}
