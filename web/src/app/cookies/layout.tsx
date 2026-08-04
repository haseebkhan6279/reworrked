import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  description: "REWORRKED cookie preferences and privacy controls.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://reworrked.com/cookies" },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
