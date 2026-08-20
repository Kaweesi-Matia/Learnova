import { motion } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const instructors = [
  { name: "Sarah Johnson", role: "Senior Full Stack Engineer", specialty: "Web Development", bio: "Builds modern web applications and teaches practical React, Node.js and full-stack development through project-based lessons.", courses: 4, students: "3.8K", rating: "4.9", initials: "SJ" },
  { name: "Daniel Okello", role: "Data Scientist & Python Educator", specialty: "Data Science", bio: "Helps learners turn Python, statistics and data analysis into practical skills they can use in real business environments.", courses: 3, students: "2.9K", rating: "4.8", initials: "DO" },
  { name: "Aisha Patel", role: "Product Designer", specialty: "UI/UX Design", bio: "Teaches user research, wireframing, prototyping and product design with a strong focus on accessible user experiences.", courses: 3, students: "2.4K", rating: "4.9", initials: "AP" },
  { name: "Michael Chen", role: "Cloud & DevOps Engineer", specialty: "Cloud Computing", bio: "Makes cloud infrastructure and DevOps easier to understand with practical deployment, automation and monitoring projects.", courses: 3, students: "2.1K", rating: "4.8", initials: "MC" },
  { name: "Grace Namusoke", role: "Cybersecurity Specialist", specialty: "Cybersecurity", bio: "Introduces secure development, network security and security fundamentals through realistic scenarios and hands-on exercises.", courses: 2, students: "1.7K", rating: "4.9", initials: "GN" },
  { name: "James Williams", role: "AI & Machine Learning Engineer", specialty: "Artificial Intelligence", bio: "Teaches machine learning and generative AI concepts from fundamentals through practical projects and responsible AI practices.", courses: 4, students: "3.2K", rating: "4.9", initials: "JW" },
  { name: "Olivia Brown", role: "Digital Marketing Strategist", specialty: "Marketing", bio: "Covers content strategy, SEO, social media and performance marketing with measurable, career-focused exercises.", courses: 2, students: "1.9K", rating: "4.7", initials: "OB" },
  { name: "Samuel Kato", role: "Mobile App Developer", specialty: "Mobile Development", bio: "Guides learners through mobile application architecture, APIs and production-ready development workflows.", courses: 3, students: "2.0K", rating: "4.8", initials: "SK" },
];

export default function InstructorsPage() {
  return <>
    <Navbar />
    <main>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-page py-20 text-center">
          <p className="eyebrow">Learn from practitioners</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-black tracking-tight text-slate-950">Meet the instructors behind your next skill.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">Learn from experienced professionals who turn real-world knowledge into practical lessons, projects and career-focused guidance.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/courses" className="btn-primary">Browse their courses <ArrowRight size={18} className="ml-2" /></Link>
            <Link to="/register" className="btn-secondary">Start learning</Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor, index) => <motion.article key={instructor.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="card overflow-hidden">
            <div className="bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-xl font-black">{instructor.initials}</div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{instructor.specialty}</span>
              </div>
              <h2 className="mt-6 text-xl font-black">{instructor.name}</h2>
              <p className="mt-1 text-sm text-slate-300">{instructor.role}</p>
            </div>
            <div className="p-6">
              <p className="min-h-[84px] text-sm leading-6 text-slate-600">{instructor.bio}</p>
              <div className="mt-5 grid grid-cols-3 border-y border-slate-100 py-4 text-center">
                <div><div className="font-black">{instructor.courses}</div><div className="text-xs text-slate-500">Courses</div></div>
                <div><div className="font-black">{instructor.students}</div><div className="text-xs text-slate-500">Learners</div></div>
                <div><div className="flex items-center justify-center gap-1 font-black"><Star size={14} className="fill-current text-amber-500" />{instructor.rating}</div><div className="text-xs text-slate-500">Rating</div></div>
              </div>
              <Link to={`/courses?search=${encodeURIComponent(instructor.specialty)}`} className="mt-5 inline-flex items-center font-bold text-brand-600">Explore courses <ArrowRight size={16} className="ml-2" /></Link>
            </div>
          </motion.article>)}
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {[[Users, "Practical experience", "Learn from people who use their skills on real projects and in real professional environments."], [BookOpen, "Structured courses", "Follow clear learning paths with lessons, projects, quizzes and measurable progress."], [CheckCircle2, "Career-focused", "Build capabilities you can demonstrate through projects, certificates and completed learning paths."]].map(([Icon, title, text]) => <div className="card p-7" key={title}><Icon className="text-brand-600" size={28} /><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></div>)}
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
