import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import Loading from "../components/Loading";
import api from "../services/api";

export default function CoursesPage() {
  const [params] = useSearchParams();
  const [courses,setCourses]=useState([]), [loading,setLoading]=useState(true), [search,setSearch]=useState(params.get("search")||"");
  const [level,setLevel]=useState(""), [sort,setSort]=useState("");
  useEffect(()=>{setLoading(true); api.get(`/courses?search=${encodeURIComponent(search)}&level=${level}&sort=${sort}`).then(r=>setCourses(r.data.courses)).finally(()=>setLoading(false));},[search,level,sort]);
  return <><Navbar/><main className="container-page py-12">
    <div><p className="eyebrow">Course marketplace</p><h1 className="mt-2 text-4xl font-black">Find your next course.</h1><p className="mt-3 text-slate-500">Search practical learning built for real-world skills.</p></div>
    <div className="mt-8 grid gap-3 md:grid-cols-[1fr_180px_180px]">
      <label className="flex items-center rounded-xl border bg-white px-4"><Search className="mr-3 text-slate-400"/><input className="w-full py-3 outline-none" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses, instructors..."/></label>
      <select className="input" value={level} onChange={e=>setLevel(e.target.value)}><option value="">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
      <select className="input" value={sort} onChange={e=>setSort(e.target.value)}><option value="">Sort</option><option value="popular">Popularity</option><option value="newest">Newest</option><option value="rating">Rating</option></select>
    </div>
    <div className="mt-10 flex items-center gap-2 text-sm text-slate-500"><SlidersHorizontal size={16}/> {courses.length} courses found</div>
    {loading ? <Loading/> : courses.length ? <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{courses.map(c=><CourseCard key={c._id} course={c}/>)}</div> : <div className="card mt-6 p-12 text-center"><h3 className="text-xl font-bold">No courses found</h3><p className="mt-2 text-slate-500">Try another search or remove a filter.</p></div>}
  </main><Footer/></>;
}
