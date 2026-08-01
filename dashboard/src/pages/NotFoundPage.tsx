import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-rw-canvas px-4 text-center">
      <p className="font-display text-7xl tracking-[0.12em] text-rw-border">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl tracking-[0.08em]">
        Not found
      </h1>
      <Link
        to="/"
        className="mt-8 text-sm text-rw-accent hover:underline"
      >
        Back to admin
      </Link>
    </div>
  );
}
