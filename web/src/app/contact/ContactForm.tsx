"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="border border-rw-border bg-rw-surface p-6 text-sm text-rw-muted">
        Message received. We will reply shortly.
      </p>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <Input label="Name" name="name" required />
      <Input label="Email" name="email" type="email" required />
      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full border border-rw-border bg-rw-surface px-4 py-3 text-sm text-rw-text placeholder:text-rw-muted/60 focus:border-rw-accent focus:outline-none"
        />
      </label>
      <Button type="submit" size="lg">
        Send message
      </Button>
    </form>
  );
}
