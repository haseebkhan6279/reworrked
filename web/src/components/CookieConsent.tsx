"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("rw-cookie-consent");
    if (!v) setVisible(true);
  }, []);

  if (!visible) return null;

  const save = (value: string) => {
    localStorage.setItem("rw-cookie-consent", value);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] bg-rw-canvas-elev/95 p-4 backdrop-blur-sm md:p-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm text-rw-muted">
          We use essential cookies and optional analytics.{" "}
          <Link href="/cookies" className="text-rw-text underline underline-offset-2">
            Cookie settings
          </Link>
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => save("essential")}>
            Essential only
          </Button>
          <Button size="sm" onClick={() => save("all")}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
