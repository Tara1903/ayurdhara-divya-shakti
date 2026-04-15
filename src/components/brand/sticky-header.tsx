import Link from "next/link";
import { Leaf, Menu, MessageCircle, UserRound } from "lucide-react";
import { signOutCustomerAction } from "@/app/actions/customer";
import { CartButton } from "@/components/brand/cart-button";
import { HeaderSearch, type HeaderSearchItem } from "@/components/brand/header-search";
import { BRAND, NAV_ITEMS } from "@/lib/brand";
import { products } from "@/lib/data";
import { buildWhatsAppUrl, cn } from "@/lib/utils";
import type { CustomerSessionSummary } from "@/types";

const searchItems: HeaderSearchItem[] = products.map((product) => ({
  slug: product.slug,
  title: product.name,
  category: product.category,
  shortBenefit: product.shortBenefit,
  image: product.image,
  price: product.price,
}));

export function StickyHeader({ customer }: { customer: CustomerSessionSummary | null }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(41,65,42,0.08)] bg-[rgba(250,246,239,0.86)] backdrop-blur-2xl">
      <div className="page-shell py-2.5 md:py-3">
        <div className="flex items-center gap-2.5 md:gap-5">
          <Link href="/" className="flex min-w-0 shrink items-center gap-2 md:shrink-0 md:gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-forest)] text-white shadow-[0_14px_34px_rgba(46,125,50,0.28)] md:h-11 md:w-11">
              <Leaf className="h-4.5 w-4.5 md:h-5 md:w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-serif-display text-sm leading-none text-[var(--color-ink)] sm:text-base md:text-xl">
                {BRAND.name}
              </p>
              <p className="mt-1 hidden truncate text-[10px] uppercase tracking-[0.22em] text-[var(--color-gold)] md:block">
                Premium Ayurvedic Wellness
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 lg:block">
            <HeaderSearch items={searchItems} />
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <a
              href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/86 px-4 py-2 text-sm font-medium text-[var(--color-forest)] xl:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>

            <CartButton />

            <Link
              href={customer ? "/account" : "/auth"}
              aria-label={customer ? "My account" : "Login or sign up"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/86 text-[var(--color-forest)] md:h-11 md:w-11"
            >
              <UserRound className="h-4 w-4" />
            </Link>

            <details className="relative lg:hidden">
              <summary className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[var(--color-line)] bg-white/86 text-[var(--color-forest)] md:h-11 md:w-11">
                <Menu className="h-5 w-5" />
              </summary>
              <div className="absolute right-0 top-12 z-30 grid min-w-[min(20rem,calc(100vw-1.5rem))] gap-2 rounded-[28px] border border-[var(--color-line)] bg-[rgba(255,252,247,0.97)] p-3 shadow-[0_24px_60px_rgba(36,53,24,0.16)] backdrop-blur-xl md:top-14">
                <Link
                  href={customer ? "/account" : "/auth"}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-[rgba(46,125,50,0.06)]"
                >
                  {customer ? "My Account" : "Login / Sign Up"}
                </Link>
                <a
                  href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-forest)] hover:bg-[rgba(46,125,50,0.06)]"
                >
                  Order on WhatsApp
                </a>
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-[rgba(46,125,50,0.06)]",
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
                {customer ? (
                  <form action={signOutCustomerAction}>
                    <button
                      type="submit"
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-[var(--color-forest)] hover:bg-[rgba(46,125,50,0.06)]"
                    >
                      Logout
                    </button>
                  </form>
                ) : null}
              </div>
            </details>
          </div>
        </div>

        <div className="mt-2.5 lg:hidden">
          <HeaderSearch items={searchItems} />
        </div>

        <div className="mt-3 hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-white hover:text-[var(--color-forest)]",
                ("highlight" in item && item.highlight) &&
                  "bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)] shadow-[0_10px_30px_rgba(46,125,50,0.08)]",
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
          <div className="ml-auto flex items-center gap-2">
            <Link
              href={customer ? "/account" : "/auth"}
              className="rounded-full border border-[var(--color-line)] bg-white/88 px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
            >
              {customer ? "My Account" : "Login / Sign Up"}
            </Link>
            {customer ? (
              <form action={signOutCustomerAction}>
                <button
                  type="submit"
                  className="rounded-full border border-[var(--color-line)] bg-white/88 px-4 py-2 text-sm font-medium text-[var(--color-forest)]"
                >
                  Logout
                </button>
              </form>
            ) : null}
          </div>
        </div>

        <div className="mobile-scroll-row mt-2.5 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full border border-[var(--color-line)] bg-white/88 px-3.5 py-2 text-sm font-medium whitespace-nowrap text-[var(--color-ink)]",
                ("highlight" in item && item.highlight) &&
                  "border-transparent bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
