import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export function SignInPage() {
  const { token, signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/" replace />;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      await signIn(String(fd.get("email")), String(fd.get("password")));
      navigate("/");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-rw-canvas px-4">
      <div className="w-full max-w-sm border border-rw-border bg-rw-surface p-8">
        <p className="font-display text-3xl tracking-[0.14em]">REWORRKED</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-rw-muted">
          Admin sign in
        </p>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              defaultValue="meermustafa218@gmail.com"
              className="mt-2 h-11 w-full border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              defaultValue="admin"
              className="mt-2 h-11 w-full border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
            />
          </label>
          {error && <p className="text-xs text-rw-sale">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full bg-rw-accent text-sm font-medium text-rw-accent-ink hover:bg-white disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-[11px] text-rw-muted">
          JWT shell · wire to Nest Passport auth
        </p>
      </div>
    </div>
  );
}
