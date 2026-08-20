import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
        <GraduationCap size={22} />
      </span>
      <span>Learn<span className="text-brand-600">Hub</span></span>
    </Link>
  );
}
