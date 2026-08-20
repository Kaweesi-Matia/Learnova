import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { CheckCircle2, Clock3, PlayCircle, Star, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CourseDetailPage(){
  const {id}=useParams(), navigate=useNavigate(), {user}=useAuth();
  const [course,setCourse]=useState(null),[enrolled,setEnrolled]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState("");
  useEffect(()=>{api.get(`/courses/${id}`).then(r=>setCourse(r.data.course)); if(user)api.get(`/enrollments/check/${id}`).then(r=>setEnrolled(r.data.enrolled)).catch(()=>{});},[id,user]);
  if(!course)return <><Navbar/><Loading/></>;
  const enroll=async()=>{if(!user)return navigate("/login");try{setBusy(true);await api.post("/enrollments",{courseId:id});setEnrolled(true)}catch(e){setError(e.response?.data?.message||"Enrollment failed")}finally{setBusy(false)}};
  return <><Navbar/><main className="container-page py-10">
    <div className="grid gap-10 lg:grid-cols-[1.5fr_.8fr]">
      <div><span className="eyebrow">{course.category?.name}</span><h1 className="mt-3 text-4xl font-black">{course.title}</h1><p className="mt-4 text-lg leading-8 text-slate-600">{course.description}</p>
      <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-500"><span className="flex gap-1"><Star className="fill-amber-400 text-amber-400" size={18}/>{course.rating?.toFixed?.(1)||"4.8"}</span><span className="flex gap-1"><Users size={18}/>{course.studentsCount||0} students</span><span className="flex gap-1"><Clock3 size={18}/>{course.duration||"8 hours"}</span></div>
      <div className="mt-10"><h2 className="text-2xl font-black">What you'll learn</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{(course.objectives||["Build practical skills","Complete real projects","Understand core concepts","Prepare for real-world work"]).map(x=><div className="flex gap-2 text-sm" key={x}><CheckCircle2 size={18} className="text-brand-600"/>{x}</div>)}</div></div>
      <div className="mt-12"><h2 className="text-2xl font-black">Course curriculum</h2><div className="mt-5 space-y-3">{course.modules?.map((m,i)=><details key={m._id||i} className="card p-5"><summary className="cursor-pointer font-bold">{i+1}. {m.title} <span className="float-right text-sm text-slate-400">{m.lessons?.length||0} lessons</span></summary><div className="mt-4 space-y-3">{m.lessons?.map(l=><div className="flex items-center gap-3 text-sm text-slate-600" key={l._id}><PlayCircle size={17}/>{l.title}<span className="ml-auto">{l.duration||"10m"}</span></div>)}</div></details>)}</div></div>
      </div>
      <aside className="h-fit overflow-hidden rounded-2xl border bg-white shadow-soft"><img className="h-52 w-full object-cover" src={course.thumbnail}/><div className="p-6"><div className="text-3xl font-black">${Number(course.price||0).toFixed(0)}</div><p className="mt-2 text-sm text-slate-500">Lifetime access</p>{error&&<p className="mt-3 text-sm text-red-600">{error}</p>}<button disabled={busy} onClick={()=>enrolled?navigate(`/learn/${id}`):enroll()} className="btn-primary mt-5 w-full">{enrolled?"Continue learning":busy?"Enrolling...":"Enroll now"}</button><p className="mt-4 text-center text-xs text-slate-400">Secure enrollment • Learn at your own pace</p></div></aside>
    </div>
  </main></>
}
