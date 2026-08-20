import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, PlayCircle } from "lucide-react";
import api from "../../services/api";
import Loading from "../../components/Loading";

export default function MyCoursesPage() {
  const [data, setData] = useState({ enrollments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/enrollments/my-courses").then(r => setData(r.data)).catch(e => setError(e.response?.data?.message || "Unable to load your courses.")).finally(() => setLoading(false)); }, []);
  if (loading) return <Loading />;
  return <section>
    <p className="eyebrow">Learning</p><h1 className="mt-2 text-3xl font-black">My Courses</h1><p className="mt-2 text-slate-500">Continue learning where you left off.</p>
    {error ? <div className="card mt-6 p-8 text-red-600">{error}</div> : data.enrollments?.length ? <div className="mt-8 grid gap-5 md:grid-cols-2">{data.enrollments.map(e => <article key={e._id} className="card overflow-hidden"><img src={e.course?.thumbnail} className="h-44 w-full object-cover"/><div className="p-5"><h3 className="text-xl font-bold">{e.course?.title}</h3><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-brand-600" style={{width:`${e.progress || 0}%`}} /></div><p className="mt-2 text-sm text-slate-500">{e.progress || 0}% complete</p><Link className="btn-primary mt-4" to={`/learn/${e.course?._id}`}><PlayCircle size={18}/> Continue Learning</Link></div></article>)}</div> : <div className="card mt-8 p-12 text-center"><BookOpen className="mx-auto text-slate-300" size={42}/><h3 className="mt-4 text-xl font-bold">No courses yet</h3><p className="mt-2 text-slate-500">Browse the course marketplace and enroll in your first course.</p><Link to="/courses" className="btn-primary mt-5">Browse Courses</Link></div>}
  </section>;
}
