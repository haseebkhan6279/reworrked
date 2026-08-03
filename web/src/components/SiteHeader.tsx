"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

type Department = "men" | "women";

type MenuItem = {
  name: string;
  href?: string;
  comingSoon?: boolean;
};

const DEPARTMENT_ITEMS: MenuItem[] = [
  { name: "Clothing", comingSoon: true },
  { name: "Accessories", comingSoon: true },
  { name: "Shoes", comingSoon: true },
  { name: "Caps", href: "/products" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [department, setDepartment] = useState<Department>("men");
  const { count, openCart } = useCart();

  function closeMenu() {
    setMobileOpen(false);
  }

  return (
    <header className="relative z-50 bg-transparent">
      <div className="relative mx-auto grid h-14 max-w-[1600px] grid-cols-3 items-center px-3 sm:px-4 md:h-16 md:px-6">
        <div className="flex items-center gap-2 justify-self-start sm:gap-3">
          <button
            type="button"
            className="flex items-center gap-2 text-rw-text"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v);
              setSearchOpen(false);
            }}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] md:inline">
              Menu
            </span>
          </button>
        </div>

        <Link
          href="/"
          className="justify-self-center font-display text-xl tracking-[0.16em] text-white sm:text-2xl md:text-[1.85rem]"
        >
          REWORRKED
        </Link>

        <div className="flex items-center gap-3 justify-self-end sm:gap-4 md:gap-5">
          <Link
            href="/auth/sign-in"
            aria-label="Account"
            className="hidden text-rw-text sm:block"
          >
            <UserIcon />
          </Link>
          <button
            type="button"
            aria-label="Search"
            onClick={() => {
              setSearchOpen((v) => !v);
              setMobileOpen(false);
            }}
            className="text-rw-text"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label={`Cart, ${count} items`}
            onClick={openCart}
            className="relative text-rw-text"
          >
            <BagIcon />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-white px-1 text-[10px] font-medium text-black">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-rw-border/30 bg-rw-canvas/95 px-3 py-3 backdrop-blur-md sm:px-4 md:px-6">
          <form action="/products" className="mx-auto max-w-[1600px]">
            <input
              name="q"
              autoFocus
              placeholder="SEARCH CAPS…"
              className="h-11 w-full border border-rw-border bg-rw-surface px-4 text-xs uppercase tracking-[0.14em] text-rw-text placeholder:text-rw-muted focus:border-white focus:outline-none"
            />
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-50 max-h-[80vh] overflow-y-auto border-t border-rw-border/30 bg-rw-canvas/98 px-4 py-6 backdrop-blur-md md:px-6">
          <nav className="mx-auto flex max-w-[1600px] flex-col md:max-w-md">
            <div
              className="mb-8 flex gap-8 border-b border-rw-border/40 pb-4"
              role="tablist"
              aria-label="Department"
            >
              {(["men", "women"] as const).map((dept) => {
                const active = department === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setDepartment(dept)}
                    className={`text-sm uppercase tracking-[0.2em] transition-colors ${
                      active
                        ? "font-semibold text-white"
                        : "text-rw-muted hover:text-white"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>

            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Shop by categories
            </p>

            <ul className="flex flex-col gap-4">
              {DEPARTMENT_ITEMS.map((item) => (
                <li key={`${department}-${item.name}`}>
                  {item.comingSoon || !item.href ? (
                    <span
                      className="flex items-baseline gap-3 text-sm uppercase tracking-[0.14em] text-rw-muted"
                      aria-disabled="true"
                    >
                      {item.name}
                      <span className="text-[10px] tracking-[0.12em] text-rw-muted/70">
                        Coming Soon
                      </span>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="text-sm font-medium uppercase tracking-[0.14em] text-white hover:text-rw-accent"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 border-t border-rw-border/40 pt-6">
              <Link
                href="/blog"
                onClick={closeMenu}
                className="text-sm uppercase tracking-[0.18em] text-rw-muted hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="text-sm uppercase tracking-[0.18em] text-rw-muted hover:text-white"
              >
                Contact
              </Link>
              <Link
                href="/auth/sign-in"
                onClick={closeMenu}
                className="text-sm uppercase tracking-[0.18em] text-rw-muted hover:text-white sm:hidden"
              >
                Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V7a3 3 0 016 0v1" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </svg>
  );
}
