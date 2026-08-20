import { Link, Outlet, useLocation } from "react-router-dom";
import { BookOpen, Award, BarChart3, Heart, LayoutDashboard, LogOut, Settings, UserRound, Users, PlusCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const student = [
  ["/dashboard","Dashboard",LayoutDashboard],[ "/dashboard/courses","My Courses",BookOpen],
  ["/courses","Browse Courses",BookOpen],["/dashboard/wishlist","Wishlist",Heart],
  ["/dashboard/certificates","Certificates",Award],["/dashboard/profile","Profile",UserRound],
  ["/dashboard/settings","Settings",Settings]
];
const instructor = [
  ["/instructor","Dashboard",LayoutDashboard],["/instructor/courses","My Courses",BookOpen],
  ["/instructor/create","Create Course",PlusCircle],["/instructor/students","Students",Users],
  ["/instructor/analytics","Analytics",BarChart3],["/dashboard/profile","Profile",UserRound]
];
const admin = [
  ["/admin","Dashboard",LayoutDashboard],["/admin/users","Users",Users],
  ["/admin/courses","Courses",BookOpen],["/admin/categories","Categories",BookOpen],
  ["/admin/reviews","Reviews",ShieldCheck],["/dashboard/profile","Profile",UserRound]
];

export default function DashboardLayout({ role = "STUDENT" }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const items = role === "ADMIN" ? admin : role === "INSTRUCTOR" ? instructor : student;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container-page grid gap-6 py-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-3 lg:block">
          <div className="px-3 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{role.toLowerCase()}</p>
            <p className="mt-1 font-bold">{user?.name}</p>
          </div>
          <nav className="space-y-1">
            {items.map(([to,label,Icon]) => <Link key={to} to={to} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${location.pathname===to ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={18}/>{label}</Link>)}
          </nav>
          <button onClick={logout} className="mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 hover:bg-slate-50"><LogOut size={18}/>Sign out</button>
        </aside>
        <main className="min-w-0"><Outlet/></main>
      </div>
    </div>
  );
}
