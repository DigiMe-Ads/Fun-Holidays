import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, collectionGroup, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function StatCard({ label, value, icon, color, to }) {
  return (
    <Link
      to={to}
      className={`bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-extrabold text-gray-900">{value}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </Link>
  );
}

function tsToString(ts) {
  if (!ts) return "—";
  if (ts.toDate) return ts.toDate().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  return new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const TYPE_BADGE = {
  contact:               "bg-blue-100 text-blue-700",
  "tailor-made":         "bg-purple-100 text-purple-700",
  newsletter:            "bg-green-100 text-green-700",
  "destination-enquiry": "bg-orange-100 text-orange-700",
};
const STATUS_BADGE = {
  new:     "bg-yellow-100 text-yellow-700",
  read:    "bg-gray-100 text-gray-600",
  replied: "bg-green-100 text-green-700",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ tours: 0, blogs: 0, destinations: 0, enquiries: 0, newEnquiries: 0, pendingComments: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [toursSnap, blogsSnap, destsSnap, enquiriesSnap, commentsSnap] = await Promise.all([
          getDocs(collection(db, "tours")),
          getDocs(collection(db, "blogs")),
          getDocs(collection(db, "destinations")),
          getDocs(collection(db, "enquiries")),
          getDocs(collectionGroup(db, "comments")),
        ]);

        const enquiries = enquiriesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const newCount = enquiries.filter((e) => e.status === "new").length;
        const pendingComments = commentsSnap.docs.filter((d) => !d.data().approved).length;
        const sorted = enquiries.sort((a, b) => {
          const at = a.createdAt?.toMillis?.() ?? new Date(a.createdAt ?? 0).getTime();
          const bt = b.createdAt?.toMillis?.() ?? new Date(b.createdAt ?? 0).getTime();
          return bt - at;
        });

        setStats({
          tours: toursSnap.size,
          blogs: blogsSnap.size,
          destinations: destsSnap.size,
          enquiries: enquiriesSnap.size,
          newEnquiries: newCount,
          pendingComments,
        });
        setRecent(sorted.slice(0, 6));
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <p className="text-gray-400 text-sm">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back. Here's what's happening.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-10">
        <StatCard label="Tour Packages" value={stats.tours} icon="🗺️" color="bg-orange-50" to="/admin/tours" />
        <StatCard label="Blog Posts"    value={stats.blogs}  icon="✍️"  color="bg-blue-50"   to="/admin/blog" />
        <StatCard label="Destinations"  value={stats.destinations} icon="🌴" color="bg-green-50" to="/admin/destinations" />
        <StatCard
          label={`Enquiries (${stats.newEnquiries} new)`}
          value={stats.enquiries}
          icon="📬"
          color={stats.newEnquiries > 0 ? "bg-yellow-50" : "bg-gray-50"}
          to="/admin/enquiries"
        />
        <StatCard
          label={stats.pendingComments > 0 ? `Comments (${stats.pendingComments} pending)` : "Comments"}
          value={stats.pendingComments}
          icon="💬"
          color={stats.pendingComments > 0 ? "bg-orange-50" : "bg-gray-50"}
          to="/admin/blog-comments"
        />
      </div>

      {/* Recent enquiries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-yellow-500 hover:text-yellow-600 text-sm font-medium">
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-gray-400 text-sm">No enquiries yet.</p>
            <p className="text-gray-300 text-xs mt-1">Form submissions will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="px-6 py-3 text-gray-400 font-medium">Date</th>
                  <th className="px-6 py-3 text-gray-400 font-medium">Name</th>
                  <th className="px-6 py-3 text-gray-400 font-medium">Type</th>
                  <th className="px-6 py-3 text-gray-400 font-medium">Status</th>
                  <th className="px-6 py-3 text-gray-400 font-medium">Subject</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-500 whitespace-nowrap">{tsToString(e.createdAt)}</td>
                    <td className="px-6 py-3 font-medium text-gray-900">{e.name || "—"}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_BADGE[e.type] || "bg-gray-100 text-gray-600"}`}>
                        {e.type || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[e.status] || ""}`}>
                        {e.status || "new"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600 max-w-xs truncate">{e.subject || e.destination || e.tourName || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
