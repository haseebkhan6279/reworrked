import { Link } from "react-router-dom";

const SHORTCUTS = [
  {
    to: "/orders",
    title: "Orders",
    desc: "COD bookings & customer details",
  },
  {
    to: "/products",
    title: "Products",
    desc: "Create, edit, publish caps",
  },
  {
    to: "/categories",
    title: "Categories",
    desc: "Fitted, snapback, drops…",
  },
];

export function HomePage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-[0.08em]">Home</h1>
      <p className="mt-2 text-sm text-rw-muted">
        REWORRKED Admin · shortcuts
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {SHORTCUTS.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="border border-rw-border bg-rw-surface p-5 transition-colors hover:border-rw-accent"
          >
            <p className="font-display text-xl tracking-[0.08em]">{s.title}</p>
            <p className="mt-2 text-sm text-rw-muted">{s.desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Published", "42"],
          ["Draft", "3"],
          ["Low stock", "5"],
        ].map(([l, v]) => (
          <div key={l} className="border border-rw-border bg-rw-surface-2 p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
              {l}
            </p>
            <p className="mt-2 font-display text-3xl tracking-[0.06em] text-rw-accent">
              {v}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
