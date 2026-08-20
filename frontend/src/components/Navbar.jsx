import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, UserRound } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dashboard = user?.role === "ADMIN" ? "/admin" : user?.role === "INSTRUCTOR" ? "/instructor" : "/dashboard";

  const signOut = () => { logout(); navigate("/"); };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          <Link className="text-sm font-medium hover:text-brand-600" to="/courses">Courses</Link>
          <Link className="text-sm font-medium hover:text-brand-600" to="/courses?category=Design">Categories</Link>
          <Link className="text-sm font-medium hover:text-brand-600" to="/instructors">Instructors</Link>
          <Link className="text-sm font-medium hover:text-brand-600" to="/about">About</Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link className="btn-secondary !px-4 !py-2" to={dashboard}><UserRound size={16} className="mr-2" /> Dashboard</Link>
              <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" onClick={signOut}><LogOut size={18}/></button>
            </>
          ) : (
            <>
              <Link className="font-semibold text-slate-700" to="/login">Login</Link>
              <Link className="btn-primary !px-4 !py-2" to="/register">Get Started</Link>
            </>
          )}
        </div>
        <button className="rounded-xl p-2 md:hidden" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
      {open && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <div className="container-page flex flex-col gap-3">
            <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>
            <Link to="/instructors" onClick={() => setOpen(false)}>Instructors</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            {user ? <Link to={dashboard} onClick={() => setOpen(false)}>Dashboard</Link> : <Link to="/login" onClick={() => setOpen(false)}>Login</Link>}
          </div>
        </div>
      )}
    </header>
  );
}
