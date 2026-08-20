import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import Loading from "../components/Loading";
import api from "../services/api";

export default function CoursesPage() {
  const [params] = useSearchParams();
  const category = params.get("category") || "";
  const [courses,setCourses]=useState([]), [loading,setLoading]=useState(true), [error,setError]=useState(""), [search,setSearch]=useState(params.get("search")||"");
  const [categories,setCategories]=useState([]), [level,setLevel]=useState(""), [sort,setSort]=useState("");

  useEffect(()=>{
    api.get("/courses/meta/categories")
      .then(r=>setCategories(r.data.categories||[]))
      .catch(()=>setCategories([]));
  },[]);
  useEffect(()=>{setLoading(true);setError("");api.get(`/courses?search=${encodeURIComponent(search)}&level=${level}&sort=${sort}&category=${encodeURIComponent(category)}`).then(r=>setCourses(r.data.courses||[])).catch(e=>setError(e.response?.data?.message||"Unable to connect to LearnHub API. Start the backend and seed the database.")).finally(()=>setLoading(false));},[search,level,sort,category]);
  return <><Navbar/><main className="container-page py-12">
    <div><p className="eyebrow">Course marketplace</p><h1 className="mt-2 text-4xl font-black">Find your next course.</h1><p className="mt-3 text-slate-500">Search practical learning built for real-world skills.</p></div>
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link className={`rounded-full px-4 py-2 text-sm font-semibold ${!category ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700"}`} to="/courses">All categories</Link>
        {categories.map(c=>(
          <Link key={c._id} to={`/courses?category=${encodeURIComponent(c.slug)}`} className={`rounded-full px-4 py-2 text-sm font-semibold ${category===c.slug || category.toLowerCase()===c.name.toLowerCase() ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700"}`}>
            {c.name}
          </Link>
        ))}
      </div>
    </div>

    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 text-sm font-bold text-slate-700">Browse by level</div>
      <div className="flex flex-wrap gap-2">
        {[
          ["", "All levels"],
          ["Beginner", "Beginner"],
          ["Intermediate", "Intermediate"],
          ["Advanced", "Advanced"],
        ].map(([value, label]) => (
          <button
            key={label}
            type="button"
            onClick={() => setLevel(value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${level === value ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700"}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>

    <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px_180px]">
      <label className="flex items-center rounded-xl border bg-white px-4"><Search className="mr-3 text-slate-400"/><input className="w-full py-3 outline-none" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses, instructors..."/></label>
      <select className="input" value={level} onChange={e=>setLevel(e.target.value)}><option value="">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
      <select className="input" value={sort} onChange={e=>setSort(e.target.value)}><option value="">Sort</option><option value="popular">Popularity</option><option value="newest">Newest</option><option value="rating">Rating</option></select>
    </div>
    <div className="mt-10 flex items-center gap-2 text-sm text-slate-500"><SlidersHorizontal size={16}/> {courses.length} courses found</div>
    {loading ? <Loading/> : error ? <div className="card mt-6 p-8 border-red-200"><h3 className="text-xl font-bold text-red-600">Unable to load courses</h3><p className="mt-2 text-slate-500">{error}</p></div> : courses.length ? <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{courses.map(c=><CourseCard key={c._id} course={c}/>)}</div> : <div className="card mt-6 p-12 text-center"><h3 className="text-xl font-bold">No courses found</h3><p className="mt-2 text-slate-500">Try another search or remove a filter.</p></div>}
  </main><Footer/></>;
}
