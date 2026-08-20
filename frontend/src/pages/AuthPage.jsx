import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

function getHomeForRole(role) {
  if (role === "ADMIN") return "/admin";
  if (role === "INSTRUCTOR") return "/instructor";
  return "/dashboard";
}

export default function AuthPage({ mode = "login" }) {
  const isLogin = mode === "login";
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setBusy(true);
      const user = isLogin
        ? await login(form.email.trim(), form.password)
        : await register(form);

      navigate(getHomeForRole(user?.role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo />
        <div>
          <p className="eyebrow text-emerald-400">LearnHub</p>
          <h1 className="mt-4 max-w-lg text-5xl font-black">Learn skills. Build your future.</h1>
          <p className="mt-5 max-w-lg text-slate-400">One place to discover courses, learn at your pace, track progress and earn credentials.</p>
        </div>
        <p className="text-sm text-slate-500">© 2026 LearnHub</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <h2 className="text-3xl font-black">{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p className="mt-2 text-slate-500">{isLogin ? "Sign in to continue learning." : "Start your LearnHub journey today."}</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {!isLogin && <input className="input" placeholder="Full name" required value={form.name} onChange={update("name")} />}
            <input className="input" type="email" required placeholder="Email" value={form.email} onChange={update("email")} />
            <input className="input" type="password" required placeholder="Password" value={form.password} onChange={update("password")} />
            {!isLogin && <input className="input" type="password" required placeholder="Confirm password" value={form.confirmPassword} onChange={update("confirmPassword")} />}

            {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <button disabled={busy} className="btn-primary w-full">
              {busy ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link className="font-bold text-brand-600" to={isLogin ? "/register" : "/login"}>
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>

          {isLogin && <Link className="mt-4 block text-center text-sm text-brand-600" to="/forgot-password">Forgot password?</Link>}
        </div>
      </div>
    </main>
  );
}
