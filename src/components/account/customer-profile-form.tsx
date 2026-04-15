"use client";

import { useActionState } from "react";
import { saveCustomerProfileAction, type CustomerActionState } from "@/app/actions/customer";
import { Button } from "@/components/ui/button";
import type { CustomerProfile } from "@/types";

const initialCustomerState: CustomerActionState = {};

export function CustomerProfileForm({ profile }: { profile: CustomerProfile }) {
  const [state, action, pending] = useActionState(
    saveCustomerProfileAction,
    initialCustomerState,
  );

  return (
    <form
      action={action}
      className="rounded-[32px] border border-[var(--color-line)] bg-white/92 p-5 shadow-[0_18px_54px_rgba(44,50,28,0.08)] md:p-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name">
          <input name="fullName" defaultValue={profile.fullName} required />
        </Field>
        <Field label="Phone">
          <input name="phone" type="tel" defaultValue={profile.phone} required />
        </Field>
        <Field label="Email" className="md:col-span-2">
          <input value={profile.email} readOnly disabled />
        </Field>
      </div>

      {state.error ? <ErrorText>{state.error}</ErrorText> : null}
      {state.success ? <SuccessText>{state.success}</SuccessText> : null}

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-2 text-sm font-medium text-[var(--color-ink)] ${className ?? ""}`}>
      <span>{label}</span>
      <div className="[&>input]:w-full [&>input]:rounded-[22px] [&>input]:border [&>input]:border-[var(--color-line)] [&>input]:bg-[var(--color-surface)] [&>input]:px-4 [&>input]:py-3 [&>input]:outline-none [&>input:disabled]:opacity-80">
        {children}
      </div>
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 rounded-2xl bg-[#fff0eb] px-4 py-3 text-sm text-[#9c4b35]">{children}</p>;
}

function SuccessText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 rounded-2xl bg-[#eff8ee] px-4 py-3 text-sm text-[var(--color-forest)]">
      {children}
    </p>
  );
}
