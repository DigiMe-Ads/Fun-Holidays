import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collectionGroup, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

function tsToString(ts) {
  if (!ts) return "—";
  if (ts.toDate) return ts.toDate().toLocaleString("en-GB");
  return new Date(ts).toLocaleString("en-GB");
}

function Avatar({ name }) {
  const letter = (name || "?")[0].toUpperCase();
  const colors = [
    "bg-orange-100 text-orange-600",
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-600",
    "bg-pink-100 text-pink-600",
    "bg-amber-100 text-amber-700",
  ];
  const color = colors[letter.charCodeAt(0) % colors.length];
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color}`}>
      {letter}
    </div>
  );
}

export default function BlogComments() {
  const [comments, setComments]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState("pending");
  const [selected, setSelected]     = useState(null);
  const [acting, setActing]         = useState(false);

  async function load() {
    setLoading(true);
    try {
      // Collection-group query across all blogs' comments subcollections
      // Sort client-side to avoid needing a Firestore composite index
      const snap = await getDocs(collectionGroup(db, "comments"));
      const data = snap.docs
        .map((d) => ({ id: d.id, ref: d.ref, ...d.data() }))
        .sort((a, b) => {
          const at = a.createdAt?.toMillis?.() ?? new Date(a.createdAt ?? 0).getTime();
          const bt = b.createdAt?.toMillis?.() ?? new Date(b.createdAt ?? 0).getTime();
          return bt - at; // newest first
        });
      setComments(data);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const pending  = comments.filter((c) => !c.approved);
  const approved = comments.filter((c) => c.approved);
  const filtered = filter === "all" ? comments : filter === "pending" ? pending : approved;

  async function approve(c) {
    setActing(true);
    try {
      await updateDoc(c.ref, { approved: true });
      setComments((prev) => prev.map((x) => x.id === c.id ? { ...x, approved: true } : x));
      if (selected?.id === c.id) setSelected((s) => ({ ...s, approved: true }));
    } finally {
      setActing(false);
    }
  }

  async function unapprove(c) {
    setActing(true);
    try {
      await updateDoc(c.ref, { approved: false });
      setComments((prev) => prev.map((x) => x.id === c.id ? { ...x, approved: false } : x));
      if (selected?.id === c.id) setSelected((s) => ({ ...s, approved: false }));
    } finally {
      setActing(false);
    }
  }

  async function deleteComment(c) {
    if (!confirm("Delete this comment? This cannot be undone.")) return;
    setActing(true);
    try {
      await deleteDoc(c.ref);
      setComments((prev) => prev.filter((x) => x.id !== c.id));
      if (selected?.id === c.id) setSelected(null);
    } finally {
      setActing(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-extrabold text-gray-900">Blog Comments</h1>
      </div>
      <p className="text-gray-400 text-sm mb-6">Review, approve, or delete visitor comments on your blog posts.</p>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: "pending",  label: `Pending (${pending.length})` },
          { key: "approved", label: `Approved (${approved.length})` },
          { key: "all",      label: `All (${comments.length})` },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-slate-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
            }`}
          >
            {f.label}
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
        {/* Comment list */}
        <div className="flex-1 flex flex-col gap-3">
          {loading ? (
            <div className="bg-white rounded-xl border border-gray-100 py-20 text-center text-gray-400 text-sm">
              Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
              <p className="text-gray-400 text-sm">
                {filter === "pending" ? "No pending comments — you're all caught up!" : "No comments yet."}
              </p>
            </div>
          ) : (
            filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected(selected?.id === c.id ? null : c)}
                className={`bg-white rounded-xl border px-5 py-4 cursor-pointer transition-all hover:shadow-sm ${
                  selected?.id === c.id
                    ? "border-yellow-400 shadow-sm"
                    : "border-gray-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar name={c.name} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{c.name || "Anonymous"}</span>
                      {c.blogSlug && (
                        <span className="text-xs text-gray-400">on <span className="text-orange-500">{c.blogSlug}</span></span>
                      )}
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
                        c.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {c.approved ? "Approved" : "Pending"}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mb-2">{tsToString(c.createdAt)}</p>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">{c.comment}</p>
                  </div>
                </div>

                {/* Inline actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50" onClick={(e) => e.stopPropagation()}>
                  {!c.approved ? (
                    <button
                      onClick={() => approve(c)}
                      disabled={acting}
                      className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-lg disabled:opacity-50 transition-colors"
                    >
                      ✓ Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => unapprove(c)}
                      disabled={acting}
                      className="px-3 py-1.5 border border-gray-200 text-gray-500 hover:bg-gray-50 text-xs font-medium rounded-lg disabled:opacity-50 transition-colors"
                    >
                      Unapprove
                    </button>
                  )}
                  <button
                    onClick={() => deleteComment(c)}
                    disabled={acting}
                    className="px-3 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 text-xs font-medium rounded-lg disabled:opacity-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-72 shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 p-5 self-start sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm">Comment Detail</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Avatar name={selected.name} />
              <div>
                <p className="font-semibold text-gray-900 text-sm">{selected.name}</p>
                <p className="text-gray-400 text-xs">{selected.email}</p>
              </div>
            </div>

            <dl className="space-y-3 text-sm mb-5">
              {[
                ["Blog post", selected.blogSlug],
                ["Date", tsToString(selected.createdAt)],
                ["Status", selected.approved ? "Approved" : "Pending review"],
              ].map(([k, v]) =>
                v ? (
                  <div key={k}>
                    <dt className="text-gray-400 text-xs uppercase tracking-wide">{k}</dt>
                    <dd className="text-gray-900 mt-0.5">{v}</dd>
                  </div>
                ) : null
              )}
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Comment</dt>
                <dd className="text-gray-700 text-xs leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-3">
                  {selected.comment}
                </dd>
              </div>
            </dl>

            <div className="space-y-2">
              {!selected.approved ? (
                <button
                  onClick={() => approve(selected)}
                  disabled={acting}
                  className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium disabled:opacity-50"
                >
                  ✓ Approve Comment
                </button>
              ) : (
                <button
                  onClick={() => unapprove(selected)}
                  disabled={acting}
                  className="w-full py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm disabled:opacity-50"
                >
                  Unapprove
                </button>
              )}
              {selected.email && (
                <a
                  href={`mailto:${selected.email}?subject=Re: Your comment on "${selected.blogSlug}"`}
                  className="block w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium text-center"
                >
                  Reply by Email
                </a>
              )}
              <button
                onClick={() => deleteComment(selected)}
                disabled={acting}
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
