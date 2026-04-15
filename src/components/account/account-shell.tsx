import Link from "next/link";
import type { ReactNode } from "react";
import { signOutCustomerAction } from "@/app/actions/customer";
import type { CustomerSessionSummary } from "@/types";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/wishlist", label: "Wishlist" },
];

export function AccountShell({
  children,
  currentPath,
  customer,
  title,
  description,
}: {
  children: ReactNode;
  currentPath: string;
  customer: CustomerSessionSummary;
  title: string;
  description: string;
}) {
  return (
    <section className="page-shell section-space">
      <div className="grid gap-5 xl:grid-cols-[280px_1fr] xl:gap-6">
        <aside className="rounded-[28px] border border-[var(--color-line)] bg-white/90 p-4 shadow-[0_18px_54px_rgba(44,50,28,0.08)] md:rounded-[32px] md:p-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
              My Account
            </p>
            <h2 className="font-serif-display text-2xl text-[var(--color-ink)] md:text-3xl">
              {customer.fullName}
            </h2>
            <p className="text-sm text-[var(--color-muted)]">{customer.email}</p>
            <p className="text-sm text-[var(--color-muted)]">{customer.phone}</p>
          </div>

          <div className="mobile-scroll-row mt-6 flex gap-2 overflow-x-auto pb-1 xl:hidden">
            {links.map((link) => {
              const active = currentPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    active
                      ? "bg-[rgba(46,125,50,0.14)] text-[var(--color-forest)]"
                      : "border border-[var(--color-line)] bg-white text-[var(--color-ink)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <nav className="mt-6 hidden gap-2 xl:grid">
            {links.map((link) => {
              const active = currentPath === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-[rgba(46,125,50,0.14)] text-[var(--color-forest)] shadow-[0_10px_28px_rgba(46,125,50,0.08)]"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <form action={signOutCustomerAction} className="mt-5 md:mt-6">
            <button
              type="submit"
              className="w-full rounded-full border border-[var(--color-line)] px-4 py-3 text-sm font-medium text-[var(--color-forest)]"
            >
              Logout
            </button>
          </form>
        </aside>

        <div className="space-y-6">
          <header className="rounded-[28px] border border-[var(--color-line)] bg-white/90 p-5 shadow-[0_18px_54px_rgba(44,50,28,0.08)] md:rounded-[32px] md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
              Customer Workspace
            </p>
            <h1 className="mt-3 font-serif-display text-[2.2rem] text-[var(--color-ink)] md:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)] md:text-base md:leading-7">
              {description}
            </p>
          </header>

          {children}
        </div>
      </div>
    </section>
  );
}
