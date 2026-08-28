import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

function tsToString(ts) {
  if (!ts) return "—";
  if (ts.toDate) return ts.toDate().toLocaleString("en-GB");
  return new Date(ts).toLocaleString("en-GB");
}

const TYPE_BADGE = {
  contact:       "bg-blue-100 text-blue-700",
  "tailor-made": "bg-purple-100 text-purple-700",
  newsletter:    "bg-green-100 text-green-700",
};
const STATUS_BADGE = {
  new:     "bg-yellow-100 text-yellow-800",
  read:    "bg-gray-100 text-gray-600",
  replied: "bg-green-100 text-green-700",
};

export default function EnquiriesManager() {
  const [enquiries, setEnquiries]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState("all");
  const [selected, setSelected]     = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "enquiries"));
      const data = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          const at = a.createdAt?.toMillis?.() ?? new Date(a.createdAt ?? 0).getTime();
          const bt = b.createdAt?.toMillis?.() ?? new Date(b.createdAt ?? 0).getTime();
          return bt - at;
        });
      setEnquiries(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = filter === "all" ? enquiries : enquiries.filter((e) => e.type === filter);

  async function updateStatus(id, status) {
    setActionLoading(true);
    try {
      await updateDoc(doc(db, "enquiries", id), { status });
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
      if (selected?.id === id) setSelected((s) => ({ ...s, status }));
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteEnquiry(id) {
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, "enquiries", id));
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selected?.id === id) setSelected(null);
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Enquiries</h1>
      <p className="text-gray-400 text-sm mb-6">All form submissions from your website.</p>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["all", "contact", "tailor-made", "newsletter"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-slate-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
          >
            {f === "all" ? `All (${enquiries.length})` : `${f} (${enquiries.filter((e) => e.type === f).length})`}
          </button>
        ))}
        <button
          onClick={load}
          className="ml-auto px-4 py-1.5 rounded-full text-sm border border-gray-200 text-gray-500 hover:bg-gray-50"
        >
          ↻ Refresh
        </button>
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-400 text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-400 text-sm">No enquiries found.</p>
              <p className="text-gray-300 text-xs mt-1">Form submissions will appear here once received.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-100 bg-gray-50">
                    <th className="px-5 py-3 text-gray-400 font-medium">Status</th>
                    <th className="px-5 py-3 text-gray-400 font-medium">Name</th>
                    <th className="px-5 py-3 text-gray-400 font-medium">Email</th>
                    <th className="px-5 py-3 text-gray-400 font-medium">Type</th>
                    <th className="px-5 py-3 text-gray-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr
                      key={e.id}
                      onClick={() => setSelected(selected?.id === e.id ? null : e)}
                      className={`border-b border-gray-50 cursor-pointer transition-colors ${
                        selected?.id === e.id ? "bg-yellow-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[e.status] || STATUS_BADGE.new}`}>
                          {e.status || "new"}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-medium text-gray-900">{e.name || "—"}</td>
                      <td className="px-5 py-3 text-gray-500">{e.email || "—"}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_BADGE[e.type] || "bg-gray-100 text-gray-500"}`}>
                          {e.type || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-400 whitespace-nowrap text-xs">{tsToString(e.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-5 self-start sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">Detail</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            </div>

            <dl className="space-y-3 text-sm">
              {[
                ["Name",    selected.name],
                ["Email",   selected.email],
                ["Phone",   selected.phone],
                ["Type",    selected.type],
                ["Subject", selected.subject],
                ["Tour",    selected.tourName],
                ["Date",    tsToString(selected.createdAt)],
              ].map(([k, v]) =>
                v ? (
                  <div key={k}>
                    <dt className="text-gray-400 text-xs uppercase tracking-wide">{k}</dt>
                    <dd className="text-gray-900 mt-0.5 break-words">{v}</dd>
                  </div>
                ) : null
              )}

              {selected.message && (
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide">Message</dt>
                  <dd className="text-gray-700 mt-1 text-xs leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-3">
                    {selected.message}
                  </dd>
                </div>
              )}
            </dl>

            {/* Actions */}
            <div className="mt-5 space-y-2">
              {selected.status !== "read" && (
                <button
                  onClick={() => updateStatus(selected.id, "read")}
                  disabled={actionLoading}
                  className="w-full py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  Mark as Read
                </button>
              )}
              {selected.status !== "replied" && (
                <button
                  onClick={() => updateStatus(selected.id, "replied")}
                  disabled={actionLoading}
                  className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium disabled:opacity-50"
                >
                  Mark as Replied
                </button>
              )}
              {selected.email && (
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "Your enquiry")}`}
                  className="block w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium text-center"
                >
                  Reply by Email
                </a>
              )}
              <button
                onClick={() => deleteEnquiry(selected.id)}
                disabled={actionLoading}
                className="w-full py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-sm disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
