import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function AuthPage({ mode="login" }) {
  const isLogin=mode==="login", {login,register}=useAuth(), navigate=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:"",confirmPassword:""}), [error,setError]=useState(""), [busy,setBusy]=useState(false);
  const submit=async e=>{e.preventDefault();setError("");if(!isLogin&&form.password!==form.confirmPassword)return setError("Passwords do not match.");try{setBusy(true);await (isLogin?login(form.email,form.password):register(form));navigate("/dashboard");}catch(err){setError(err.response?.data?.message||"Something went wrong.")}finally{setBusy(false)}};
  return <main className="grid min-h-screen lg:grid-cols-2">
    <div className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between"><Logo/><div><p className="eyebrow text-emerald-400">LearnHub</p><h1 className="mt-4 max-w-lg text-5xl font-black">Learn skills. Build your future.</h1><p className="mt-5 max-w-lg text-slate-400">One place to discover courses, learn at your pace, track progress and earn credentials.</p></div><p className="text-sm text-slate-500">© 2026 LearnHub</p></div>
    <div className="flex items-center justify-center p-6"><div className="w-full max-w-md"><div className="mb-8 lg:hidden"><Logo/></div><h2 className="text-3xl font-black">{isLogin?"Welcome back":"Create your account"}</h2><p className="mt-2 text-slate-500">{isLogin?"Sign in to continue learning.":"Start your LearnHub journey today."}</p>
      <form onSubmit={submit} className="mt-8 space-y-4">{!isLogin&&<input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}<input className="input" type="email" required placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input className="input" type="password" required placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>{!isLogin&&<input className="input" type="password" required placeholder="Confirm password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})}/>}
      {error&&<div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}<button disabled={busy} className="btn-primary w-full">{busy?"Please wait...":isLogin?"Sign in":"Create account"}</button></form>
      <p className="mt-6 text-center text-sm text-slate-500">{isLogin?"Don't have an account? ":"Already have an account? "}<Link className="font-bold text-brand-600" to={isLogin?"/register":"/login"}>{isLogin?"Register":"Login"}</Link></p>
      {isLogin&&<Link className="mt-4 block text-center text-sm text-brand-600" to="/forgot-password">Forgot password?</Link>}
    </div></div>
  </main>
}
