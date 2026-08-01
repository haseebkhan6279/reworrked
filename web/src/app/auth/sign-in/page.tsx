"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-display text-4xl tracking-[0.08em]">Sign in</h1>
      <p className="mt-2 text-sm text-rw-muted">
        Customer account shell · JWT via Nest API.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = "/account";
        }}
      >
        <Input label="Email" type="email" required />
        <Input label="Password" type="password" required />
        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-rw-muted">
        No account?{" "}
        <Link href="/auth/sign-up" className="text-rw-text hover:text-rw-accent">
          Sign up
        </Link>
      </p>
    </div>
  );
}
