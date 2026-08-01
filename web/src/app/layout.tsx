import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PromoBanner } from "@/components/PromoBanner";
import { CookieConsent } from "@/components/CookieConsent";
import { BackToTop } from "@/components/BackToTop";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "REWORRKED — Premium Caps",
    template: "%s · REWORRKED",
  },
  description:
    "Reworked classics. Elevated fitted, snapback, dad cap, and limited drops — collector-grade headwear.",
  metadataBase: new URL("https://reworrked.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${dmSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-rw-canvas font-sans text-rw-text antialiased"
        suppressHydrationWarning
      >
        <CartProvider>
          <PromoBanner />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
          <CookieConsent />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
