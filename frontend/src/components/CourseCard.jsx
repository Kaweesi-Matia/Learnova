import { Clock3, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
      <Link to={`/courses/${course._id}`}>
        <img className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03]" src={course.thumbnail} alt={course.title}/>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{course.category?.name || course.category || "Technology"}</span>
          <span className="text-xs text-slate-500">{course.level || "Beginner"}</span>
        </div>
        <Link to={`/courses/${course._id}`}><h3 className="mt-3 line-clamp-2 text-lg font-bold leading-6 hover:text-brand-600">{course.title}</h3></Link>
        <p className="mt-2 text-sm text-slate-500">by {course.instructor?.name || "LearnHub Instructor"}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400"/>{course.rating?.toFixed?.(1) || course.rating || "4.8"}</span>
          <span className="flex items-center gap-1"><Users size={14}/>{course.studentsCount || 0}</span>
          <span className="flex items-center gap-1"><Clock3 size={14}/>{course.duration || "8h"}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <strong className="text-xl">${Number(course.price || 0).toFixed(0)}</strong>
          <Link className="btn-primary !px-4 !py-2 text-sm" to={`/courses/${course._id}`}>View course</Link>
        </div>
      </div>
    </article>
  );
}
