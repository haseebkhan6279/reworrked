import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="md:w-48">
          <p className="font-display text-2xl tracking-[0.1em]">Account</p>
          <nav className="mt-6 flex gap-4 overflow-x-auto md:flex-col md:gap-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 text-sm text-rw-muted hover:text-rw-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth/sign-in"
              className="shrink-0 text-sm text-rw-muted hover:text-rw-sale md:mt-4"
            >
              Sign out
            </Link>
          </nav>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
