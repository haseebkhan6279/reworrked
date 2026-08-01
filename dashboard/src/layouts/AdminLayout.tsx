import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/orders", label: "Orders" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/analytics", label: "Analytics" },
];

export function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-rw-canvas text-rw-text">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 border-r border-rw-border bg-rw-canvas-elev transition-transform md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center border-b border-rw-border px-5">
          <span className="font-display text-xl tracking-[0.12em]">
            REWORRKED
          </span>
        </div>
        <p className="px-5 pt-4 text-[10px] uppercase tracking-[0.14em] text-rw-muted">
          Admin
        </p>
        <nav className="mt-2 flex flex-col gap-0.5 px-2">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 text-sm ${
                  isActive
                    ? "bg-rw-surface text-rw-accent"
                    : "text-rw-muted hover:bg-rw-surface hover:text-rw-text"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="absolute bottom-4 left-2 right-2 px-3 py-2 text-left text-sm text-rw-muted hover:text-rw-sale"
          onClick={() => {
            signOut();
            navigate("/sign-in");
          }}
        >
          Sign out
        </button>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-rw-border px-4 md:px-6">
          <button
            type="button"
            className="text-sm text-rw-muted md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            Menu
          </button>
          <p className="hidden text-xs uppercase tracking-[0.12em] text-rw-muted md:block">
            Ops · dark black
          </p>
          <span className="text-xs text-rw-muted">admin@reworrked.com</span>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
