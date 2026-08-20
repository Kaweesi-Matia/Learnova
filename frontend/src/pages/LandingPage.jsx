import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Search, Sparkles, Target, Trophy, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categories = ["Web Development","Data Science","Artificial Intelligence","UI/UX Design","Cybersecurity","Business","Mobile Development","Cloud Computing"];

export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => { api.get("/courses?limit=6").then(r => setCourses(r.data.courses)).catch(() => {}); }, []);

  return <>
    <Navbar/>
    <main>
      <section className="overflow-hidden bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page grid min-h-[620px] items-center gap-12 py-20 lg:grid-cols-2">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <span className="eyebrow">LearnHub • Career-focused learning</span>
            <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">Learn skills that move your career forward.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Practical courses, expert instructors, real projects and measurable progress — all in one modern learning platform.</p>
            <form className="mt-8 flex max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-soft" action="/courses">
              <Search className="m-3 text-slate-400"/><input name="search" className="min-w-0 flex-1 outline-none" placeholder="What do you want to learn?"/><button className="btn-primary">Search</button>
            </form>
            <div className="mt-5 flex flex-wrap gap-3"><Link className="btn-primary" to="/courses">Browse Courses <ArrowRight size={18} className="ml-2"/></Link><Link className="btn-secondary" to="/register">Explore Learning</Link></div>
          </motion.div>
          <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} className="relative">
            <div className="absolute -inset-8 rounded-full bg-brand-100 blur-3xl"/>
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
              <div className="rounded-3xl bg-slate-950 p-8 text-white">
                <Sparkles className="text-emerald-400"/>
                <p className="mt-20 text-sm text-slate-400">YOUR NEXT SKILL</p>
                <h2 className="mt-2 text-3xl font-bold">Full Stack Web Development</h2>
                <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-700"><div className="h-full w-3/5 rounded-full bg-emerald-400"/></div>
                <p className="mt-3 text-sm text-slate-400">60% course progress</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y bg-white"><div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
        {[["10K+","Learners",Users],["500+","Courses",BookOpen],["100+","Expert instructors",Target],["50K+","Lessons completed",Trophy]].map(([n,l,I]) => <div key={l} className="flex items-center gap-3"><I className="text-brand-600"/><div><div className="text-2xl font-black">{n}</div><div className="text-sm text-slate-500">{l}</div></div></div>)}
      </div></section>

      <section className="container-page py-20">
        <div className="flex items-end justify-between"><div><p className="eyebrow">Explore</p><h2 className="mt-2 text-3xl font-black">Popular categories</h2></div><Link className="font-semibold text-brand-600" to="/courses">View all</Link></div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">{categories.map(c => <Link key={c} to={`/courses?category=${encodeURIComponent(c)}`} className="card p-5 transition hover:-translate-y-1 hover:border-brand-200"><div className="font-bold">{c}</div><p className="mt-2 text-sm text-slate-500">Build practical skills</p></Link>)}</div>
      </section>

      <section className="bg-slate-50 py-20"><div className="container-page">
        <p className="eyebrow">Featured learning</p><h2 className="mt-2 text-3xl font-black">Courses designed to make progress visible.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{courses.map(c => <CourseCard key={c._id} course={c}/>)}</div>
      </div></section>

      <section className="container-page py-20"><div className="grid gap-10 lg:grid-cols-2">
        <div><p className="eyebrow">Why LearnHub?</p><h2 className="mt-3 text-4xl font-black">A learning experience built around outcomes.</h2></div>
        <div className="grid gap-5 sm:grid-cols-2">{["Expert instructors","Practical projects","Career-focused learning","Progress tracking","Certificates","Flexible learning"].map(x => <div className="flex gap-3" key={x}><CheckCircle2 className="shrink-0 text-brand-600"/><div><b>{x}</b><p className="mt-1 text-sm text-slate-500">Designed to keep learning useful, measurable and motivating.</p></div></div>)}</div>
      </div></section>

      <section className="container-page pb-20"><div className="rounded-[2rem] bg-slate-950 p-10 text-center text-white md:p-16"><p className="eyebrow text-emerald-400">Start today</p><h2 className="mt-3 text-4xl font-black">Start building your future today.</h2><p className="mx-auto mt-4 max-w-xl text-slate-400">Choose a course, build a new capability and turn consistent learning into career momentum.</p><Link className="btn-primary mt-7" to="/register">Create your account</Link></div></section>
    </main>
    <Footer/>
  </>;
}
