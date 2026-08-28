import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NAV = [
  { to: "/admin/dashboard",    label: "Dashboard",    icon: "📊" },
  { to: "/admin/enquiries",    label: "Enquiries",    icon: "📬" },
  { to: "/admin/tours",        label: "Tours",        icon: "🗺️"  },
  { to: "/admin/blog",         label: "Blog Posts",   icon: "✍️"  },
  { to: "/admin/blog-comments", label: "Comments",    icon: "💬" },
  { to: "/admin/destinations", label: "Destinations", icon: "🌴" },
  { to: "/admin/team",         label: "Team",         icon: "👥" },
  { to: "/admin/heatmap",      label: "Heatmap",      icon: "🔥" },
  { to: "/admin/seed",         label: "Seed Data",    icon: "🌱" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 flex flex-col z-30">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-slate-700">
          <div className="flex items-center gap-1">
            <span className="text-xl font-extrabold text-white">Fun</span>
            <span className="text-xl font-extrabold text-yellow-400">Holidays</span>
          </div>
          <p className="text-slate-500 text-xs mt-0.5">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-yellow-400 text-slate-900"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-5 py-4 border-t border-slate-700">
          <p className="text-slate-500 text-xs truncate mb-2">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 text-sm transition-colors"
          >
            ← Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="ml-64 flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
