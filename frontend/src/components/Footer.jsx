export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="text-xl font-extrabold text-white">Learn<span className="text-emerald-400">Hub</span></div>
          <p className="mt-3 text-sm leading-6">Learn skills. Build your future. Practical, career-focused learning for ambitious people.</p>
        </div>
        <div><h3 className="font-bold text-white">Platform</h3><div className="mt-4 space-y-2 text-sm"><a href="/courses">Courses</a><br/><a href="/instructors">Instructors</a></div></div>
        <div><h3 className="font-bold text-white">Company</h3><div className="mt-4 space-y-2 text-sm"><a href="/about">About</a><br/><span>Careers</span><br/><span>Contact</span></div></div>
        <div><h3 className="font-bold text-white">Legal</h3><div className="mt-4 space-y-2 text-sm"><span>Privacy</span><br/><span>Terms</span></div></div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-sm">© 2026 LearnHub. Built with MERN stack.</div>
    </footer>
  );
}
