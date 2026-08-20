import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, LockKeyhole } from "lucide-react";
import api from "../../services/api";
import Logo from "../../components/Logo";

export default function ResetPasswordPage() {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setBusy(true);
      const { data } = await api.post(`/auth/reset-password/${resetToken}`, {
        password,
        confirmPassword,
      });
      setSuccess(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reset your password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo />
        <div>
          <p className="eyebrow text-emerald-400">Secure reset</p>
          <h1 className="mt-4 max-w-lg text-5xl font-black">Choose a new password.</h1>
          <p className="mt-5 max-w-lg text-slate-400">Your reset link is valid for 30 minutes.</p>
        </div>
        <p className="text-sm text-slate-500">© 2026 LearnHub</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>

          {success ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <CheckCircle2 className="text-emerald-600" size={30} />
              <h2 className="mt-4 text-2xl font-black text-emerald-950">Password updated</h2>
              <p className="mt-2 text-sm text-emerald-800">{success}</p>
              <button onClick={() => navigate("/login")} className="btn-primary mt-6 w-full">
                Go to login
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <LockKeyhole size={24} />
              </div>
              <h2 className="text-3xl font-black">Reset password</h2>
              <p className="mt-2 text-slate-500">Choose a new password for your LearnHub account.</p>

              <form onSubmit={submit} className="mt-8 space-y-4">
                <input className="input" type="password" minLength={6} required placeholder="New password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className="input" type="password" minLength={6} required placeholder="Confirm new password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                {error && <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}

                <button disabled={busy} className="btn-primary w-full">
                  {busy ? "Updating password..." : "Update password"}
                </button>
              </form>
            </>
          )}

          <Link to="/login" className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-600">
            <ArrowLeft size={16} /> Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
