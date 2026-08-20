import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, CheckCircle2, HeartHandshake, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const values = [
  [Target, "Outcome focused", "Every course is designed around useful skills, practical application and visible progress rather than passive content consumption."],
  [BookOpen, "Practical learning", "Lessons, projects, quizzes and structured paths help learners move from understanding concepts to applying them."],
  [Users, "Expert instructors", "We connect learners with practitioners who can explain what matters and how skills are used in the real world."],
  [HeartHandshake, "Learner first", "LearnHub is designed to make learning approachable, measurable and flexible for people at different stages of their careers."],
];

export default function AboutPage() {
  return <>
    <Navbar />
    <main>
      <section className="bg-slate-950 text-white">
        <div className="container-page grid gap-12 py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="eyebrow text-emerald-400">About LearnHub</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">Learn skills. Build your future.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">LearnHub is a modern learning marketplace for people who want practical, career-focused skills. We bring courses, expert instructors, projects and progress tracking together in one place.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/courses" className="btn-primary">Explore courses <ArrowRight size={18} className="ml-2" /></Link><Link to="/instructors" className="btn-secondary border-slate-700 bg-transparent text-white hover:bg-white/10">Meet instructors</Link></div>
          </motion.div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="rounded-3xl bg-white p-7 text-slate-950">
              <Award className="text-brand-600" size={32} />
              <p className="mt-10 text-sm font-bold uppercase tracking-widest text-slate-400">Our mission</p>
              <h2 className="mt-3 text-3xl font-black">Make useful learning accessible and measurable.</h2>
              <p className="mt-4 leading-7 text-slate-600">Whether you are starting from zero or developing an advanced skill, LearnHub gives you a clear place to learn, practice and demonstrate progress.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="max-w-3xl"><p className="eyebrow">What we believe</p><h2 className="mt-3 text-4xl font-black">Learning should lead somewhere.</h2><p className="mt-5 text-lg leading-8 text-slate-600">A good learning platform should do more than store videos. It should help you choose the right skill, learn from a credible instructor, practice what you learn and see how far you have progressed.</p></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">{values.map(([Icon, title, text]) => <motion.div key={title} whileHover={{ y: -4 }} className="card p-7"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon size={24} /></div><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></motion.div>)}</div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card p-8"><p className="eyebrow">For learners</p><h2 className="mt-3 text-3xl font-black">Build a learning path that fits your goals.</h2><p className="mt-4 leading-7 text-slate-600">Browse by category and level, save courses to your wishlist, enroll when you are ready, track your progress and earn certificates when you complete your learning.</p><ul className="mt-6 space-y-3">{["Beginner, intermediate and advanced courses", "Progress tracking and learning dashboards", "Quizzes, projects and practical lessons", "Certificates for completed learning"].map(x => <li key={x} className="flex gap-3 text-sm font-medium"><CheckCircle2 className="shrink-0 text-brand-600" size={19} />{x}</li>)}</ul></div>
            <div className="card p-8"><p className="eyebrow">For instructors</p><h2 className="mt-3 text-3xl font-black">Turn your expertise into structured learning.</h2><p className="mt-4 leading-7 text-slate-600">Experienced professionals can share their knowledge through structured courses, lessons and assessments while helping learners build practical capabilities.</p><Link to="/register" className="btn-primary mt-7">Create an account <ArrowRight size={18} className="ml-2" /></Link></div>
          </div>
        </div>
      </section>

      <section className="container-page py-20"><div className="rounded-[2rem] bg-brand-600 p-10 text-white md:p-16"><div className="grid gap-8 md:grid-cols-3 md:items-center"><div><p className="text-4xl font-black">10K+</p><p className="mt-1 text-white/80">Learners</p></div><div><p className="text-4xl font-black">500+</p><p className="mt-1 text-white/80">Learning resources</p></div><div><p className="text-4xl font-black">100+</p><p className="mt-1 text-white/80">Expert instructors</p></div></div></div></section>
    </main>
    <Footer />
  </>;
}
