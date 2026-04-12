"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAdminAction, type AdminActionState } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";

const initialState: AdminActionState = {};

export function AdminLoginForm({
  configured,
  previewMode = false,
}: {
  configured: boolean;
  previewMode?: boolean;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(loginAdminAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/admin");
      router.refresh();
    }
  }, [router, state.success]);

  return (
    <form
      action={action}
      className="rounded-[32px] border border-[var(--color-line)] bg-white/92 p-6 shadow-[0_18px_60px_rgba(61,44,20,0.08)] md:p-8"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
          Admin Login
        </p>
        <h1 className="font-serif-display text-4xl text-[var(--color-ink)]">
          Secure dashboard access
        </h1>
        <p className="text-sm leading-7 text-[var(--color-muted)]">
          Use your configured admin credentials to manage products and orders.
        </p>
      </div>

      {!configured ? (
        <div className="mt-6 rounded-[24px] bg-[#fff8ee] p-4 text-sm leading-7 text-[var(--color-muted)]">
          Add <code>ADMIN_EMAIL</code>, <code>ADMIN_PASSWORD</code>, and{" "}
          <code>ADMIN_SESSION_SECRET</code> to enable admin login.
        </div>
      ) : null}

      {previewMode ? (
        <div className="mt-6 rounded-[24px] bg-[#eff8ee] p-4 text-sm leading-7 text-[var(--color-muted)]">
          Local preview login is enabled. Use <code>admin@ayurdhara.local</code>{" "}
          and <code>preview123</code> while reviewing on localhost.
        </div>
      ) : null}

      <div className="mt-8 grid gap-5">
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Email
          <input
            name="email"
            type="email"
            placeholder="admin@brand.com"
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
          Password
          <input
            name="password"
            type="password"
            placeholder="Your admin password"
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-3 outline-none"
            required
          />
        </label>
        {state.error ? (
          <p className="rounded-2xl bg-[#fff0eb] px-4 py-3 text-sm text-[#9c4b35]">
            {state.error}
          </p>
        ) : null}
        <Button type="submit" disabled={pending}>
          {pending ? "Signing In..." : "Login to Dashboard"}
        </Button>
      </div>
    </form>
  );
}
