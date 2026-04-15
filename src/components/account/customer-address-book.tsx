"use client";

import { useActionState } from "react";
import {
  deleteCustomerAddressAction,
  saveCustomerAddressAction,
  type CustomerActionState,
} from "@/app/actions/customer";
import { Button } from "@/components/ui/button";
import type { CustomerAddress } from "@/types";

const initialCustomerState: CustomerActionState = {};

export function CustomerAddressBook({ addresses }: { addresses: CustomerAddress[] }) {
  const [state, action, pending] = useActionState(
    saveCustomerAddressAction,
    initialCustomerState,
  );

  return (
    <div className="grid gap-6">
      <form
        action={action}
        className="rounded-[32px] border border-[var(--color-line)] bg-white/92 p-5 shadow-[0_18px_54px_rgba(44,50,28,0.08)] md:p-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Label">
            <input name="label" placeholder="Home, Office, Parent's Home" />
          </Field>
          <Field label="Recipient Name">
            <input name="recipientName" placeholder="Person receiving the order" required />
          </Field>
          <Field label="Phone">
            <input name="phone" type="tel" placeholder="10-digit mobile number" required />
          </Field>
          <Field label="Pincode">
            <input name="pincode" placeholder="Pincode" required />
          </Field>
          <Field label="Address Line 1" className="md:col-span-2">
            <input name="line1" placeholder="House / street / area" required />
          </Field>
          <Field label="Address Line 2" className="md:col-span-2">
            <input name="line2" placeholder="Landmark / locality (optional)" />
          </Field>
          <Field label="City">
            <input name="city" placeholder="City" required />
          </Field>
          <Field label="State">
            <input name="state" placeholder="State" required />
          </Field>
        </div>

        <label className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-ink)]">
          <input type="checkbox" name="isDefault" />
          Set as default address
        </label>

        {state.error ? <ErrorText>{state.error}</ErrorText> : null}
        {state.success ? <SuccessText>{state.success}</SuccessText> : null}

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : "Save Address"}
          </Button>
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-2">
        {addresses.map((address) => (
          <article
            key={address.id}
            className="rounded-[30px] border border-[var(--color-line)] bg-white/90 p-5 shadow-[0_18px_54px_rgba(44,50,28,0.08)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {address.label}
                </p>
                <h2 className="mt-2 font-serif-display text-3xl text-[var(--color-ink)]">
                  {address.recipientName}
                </h2>
              </div>
              {address.isDefault ? (
                <span className="rounded-full bg-[rgba(46,125,50,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-forest)]">
                  Default
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}
              <br />
              {address.city}, {address.state} {address.pincode}
              <br />
              {address.country}
              <br />
              {address.phone}
            </p>

            <form action={deleteCustomerAddressAction} className="mt-5">
              <input type="hidden" name="addressId" value={address.id} />
              <button
                type="submit"
                className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-[var(--color-forest)]"
              >
                Delete Address
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
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
      <div className="[&>input]:w-full [&>input]:rounded-[22px] [&>input]:border [&>input]:border-[var(--color-line)] [&>input]:bg-[var(--color-surface)] [&>input]:px-4 [&>input]:py-3 [&>input]:outline-none">
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
