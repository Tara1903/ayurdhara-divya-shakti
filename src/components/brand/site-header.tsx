import Link from "next/link";
import { Leaf, Menu, MessageCircle } from "lucide-react";
import { BRAND, NAV_ITEMS } from "@/lib/brand";
import { buildWhatsAppUrl, cn } from "@/lib/utils";
import { CartButton } from "./cart-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[rgba(246,241,231,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-forest)] text-white shadow-[0_12px_30px_rgba(46,125,50,0.28)]">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif-display text-xl leading-none text-[var(--color-ink)] md:text-2xl">
              {BRAND.name}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)] md:text-[11px] md:tracking-[0.26em]">
              Premium Ayurvedic Wellness System
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 xl:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-white/70 hover:text-[var(--color-forest)]",
                ("highlight" in item && item.highlight) &&
                  "bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)] ring-1 ring-[rgba(46,125,50,0.18)]",
              )}
            >
              <span className="inline-flex items-center gap-2">
                {item.label}
                {"badge" in item && item.badge ? (
                  <span className="rounded-full bg-[var(--color-gold)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    {item.badge}
                  </span>
                ) : null}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <details className="relative xl:hidden">
            <summary className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[var(--color-line)] bg-white/76 text-[var(--color-forest)]">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-14 z-20 grid min-w-72 gap-2 rounded-[28px] border border-[var(--color-line)] bg-[rgba(255,253,248,0.96)] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-surface)]",
                    ("highlight" in item && item.highlight) &&
                      "bg-[rgba(46,125,50,0.08)] text-[var(--color-forest)]",
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    {item.label}
                    {"badge" in item && item.badge ? (
                      <span className="rounded-full bg-[var(--color-gold)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </span>
                </Link>
              ))}
              <a
                href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-[var(--color-forest)] px-4 py-3 text-sm font-semibold text-white"
              >
                Order on WhatsApp
              </a>
            </div>
          </details>

          <a
            href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--color-forest)] md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
