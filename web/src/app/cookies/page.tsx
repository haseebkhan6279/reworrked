"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CookiesPage() {
  const [pref, setPref] = useState("essential");

  useEffect(() => {
    setPref(localStorage.getItem("rw-cookie-consent") ?? "essential");
  }, []);

  const save = (value: string) => {
    localStorage.setItem("rw-cookie-consent", value);
    setPref(value);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <h1 className="font-display text-4xl tracking-[0.08em]">Cookies</h1>
      <p className="mt-4 text-sm text-rw-muted">
        Essential cookies keep the cart and session working. Analytics cookies
        help us understand journey events — only with your consent.
      </p>
      <div className="mt-8 border border-rw-border bg-rw-surface p-6">
        <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
          Current preference
        </p>
        <p className="mt-2 text-sm capitalize text-rw-text">{pref}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            variant={pref === "essential" ? "primary" : "secondary"}
            size="sm"
            onClick={() => save("essential")}
          >
            Essential only
          </Button>
          <Button
            variant={pref === "all" ? "primary" : "secondary"}
            size="sm"
            onClick={() => save("all")}
          >
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
