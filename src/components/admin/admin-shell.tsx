import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAdminAction } from "@/app/actions/admin";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export function AdminShell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-7xl gap-5 px-4 py-8 lg:grid-cols-[260px_1fr] lg:gap-6 lg:px-8 lg:py-10">
      <aside className="rounded-[28px] border border-[var(--color-line)] bg-white/88 p-5 shadow-[0_18px_60px_rgba(61,44,20,0.08)] md:rounded-[32px] md:p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Admin Control
          </p>
          <h2 className="font-serif-display text-2xl text-[var(--color-ink)] md:text-3xl">
            Ayurdhara
          </h2>
        </div>

        <nav className="mobile-scroll-row mt-6 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:grid lg:overflow-visible lg:pb-0">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-3 text-sm font-medium whitespace-nowrap text-[var(--color-ink)] transition hover:bg-[var(--color-surface)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form action={logoutAdminAction} className="mt-6 lg:mt-8">
          <button
            type="submit"
            className="w-full rounded-full border border-[var(--color-line)] px-4 py-3 text-sm font-medium text-[var(--color-forest)]"
          >
            Logout
          </button>
        </form>
      </aside>

      <main className="space-y-6">
        <header className="rounded-[28px] border border-[var(--color-line)] bg-white/88 p-5 shadow-[0_18px_60px_rgba(61,44,20,0.08)] md:rounded-[32px] md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-gold)]">
            Admin Workspace
          </p>
          <h1 className="mt-3 font-serif-display text-[2.2rem] text-[var(--color-ink)] md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)] md:leading-7">
            {description}
          </p>
        </header>
        {children}
      </main>
    </div>
  );
}
