import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, Clock3, Trophy } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard(){
  const {user}=useAuth(); const [data,setData]=useState({enrollments:[],stats:{}}); 
  useEffect(()=>{api.get("/enrollments/my-courses").then(r=>setData(r.data)).catch(()=>{});},[]);
  const s=data.stats||{};
  return <DashboardLayout role="STUDENT"><div><p className="eyebrow">Student dashboard</p><h1 className="mt-2 text-3xl font-black">Welcome back, {user?.name?.split(" ")[0]} 👋</h1><p className="mt-2 text-slate-500">Keep your learning momentum going.</p>
  <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[[BookOpen,"Enrolled Courses",s.enrolled||data.enrollments.length||0],[Trophy,"Courses Completed",s.completed||0],[Clock3,"Learning Hours",s.hours||0],[Award,"Certificates Earned",s.certificates||0]].map(([I,l,n])=><div className="card p-5" key={l}><I className="text-brand-600"/><div className="mt-4 text-3xl font-black">{n}</div><p className="text-sm text-slate-500">{l}</p></div>)}</div>
  <div className="mt-10 flex items-center justify-between"><h2 className="text-xl font-black">Continue learning</h2><Link className="text-sm font-bold text-brand-600" to="/dashboard/courses">View all</Link></div>
  <div className="mt-4 space-y-4">{data.enrollments.slice(0,5).map(e=><div className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center" key={e._id}><img className="h-24 w-full rounded-xl object-cover sm:w-40" src={e.course.thumbnail}/><div className="flex-1"><h3 className="font-bold">{e.course.title}</h3><p className="mt-1 text-sm text-slate-500">{e.currentLesson?.title||"Continue your course"}</p><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-brand-600" style={{width:`${e.progress||0}%`}}/></div><p className="mt-1 text-xs text-slate-400">{e.progress||0}% complete</p></div><Link className="btn-primary !px-4 !py-2" to={`/learn/${e.course._id}`}>Continue</Link></div>)}</div>
  </div></DashboardLayout>
}
