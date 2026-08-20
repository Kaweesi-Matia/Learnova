import { Link, useLocation } from "react-router-dom";
import { BookOpen, Award, Heart, LayoutDashboard, LogOut, Settings, UserRound, Users, FolderTree, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const studentItems = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/dashboard/courses", "My Courses", BookOpen],
  ["/courses", "Browse Courses", BookOpen],
  ["/dashboard/wishlist", "Wishlist", Heart],
  ["/dashboard/certificates", "Certificates", Award],
  ["/dashboard/profile", "Profile", UserRound],
  ["/dashboard/settings", "Settings", Settings],
];

const adminItems = [
  ["/admin", "Dashboard", LayoutDashboard],
  ["/admin/users", "Users", Users],
  ["/admin/courses", "Courses", BookOpen],
  ["/admin/categories", "Categories", FolderTree],
  ["/admin/reviews", "Reviews", MessageSquare],
  ["/courses", "Browse Courses", BookOpen],
  ["/dashboard/profile", "Profile", UserRound],
];

export default function DashboardLayout({ children, role = "STUDENT" }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const items = role === "ADMIN" ? adminItems : studentItems;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page grid gap-6 py-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-3 lg:block">
          <div className="px-3 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{role}</p>
            <p className="mt-1 font-bold">{user?.name || "User"}</p>
          </div>

          <nav className="space-y-1">
            {items.map(([to, label, Icon]) => {
              const active = location.pathname === to || (to !== "/dashboard" && to !== "/admin" && location.pathname.startsWith(`${to}/`));
              return (
                <Link key={to} to={to} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"}`}>
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={logout}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100 hover:text-red-700"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
