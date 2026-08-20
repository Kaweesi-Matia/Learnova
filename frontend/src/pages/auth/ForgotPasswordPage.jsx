import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2, KeyRound } from "lucide-react";
import api from "../../services/api";
import Logo from "../../components/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      setBusy(true);
      const { data } = await api.post("/auth/forgot-password", {
        email: email.trim().toLowerCase(),
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create a reset link. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo />
        <div>
          <p className="eyebrow text-emerald-400">Account recovery</p>
          <h1 className="mt-4 max-w-lg text-5xl font-black">Get back to learning.</h1>
          <p className="mt-5 max-w-lg text-slate-400">
            Create a secure password reset link and continue your LearnHub journey.
          </p>
        </div>
        <p className="text-sm text-slate-500">© 2026 LearnHub</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>

          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <KeyRound size={24} />
          </div>

          <h2 className="text-3xl font-black">Forgot your password?</h2>
          <p className="mt-2 text-slate-500">
            Enter your account email and we'll help you reset your password.
          </p>

          {!result ? (
            <form onSubmit={submit} className="mt-8 space-y-4">
              <label className="block text-sm font-semibold text-slate-700">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  className="input pl-11"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

              <button disabled={busy} className="btn-primary w-full">
                {busy ? "Creating reset link..." : "Send reset link"}
              </button>
            </form>
          ) : (
            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={22} />
                <div>
                  <p className="font-bold text-emerald-900">Reset link created</p>
                  <p className="mt-1 text-sm text-emerald-800">{result.message}</p>
                </div>
              </div>

              {result.resetUrl && (
                <Link to={result.resetUrl.replace(window.location.origin, "")} className="btn-primary mt-5 w-full">
                  Continue to reset password
                </Link>
              )}

              <button
                type="button"
                onClick={() => setResult(null)}
                className="mt-3 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                Request another link
              </button>
            </div>
          )}

          <Link to="/login" className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-600">
            <ArrowLeft size={16} /> Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
