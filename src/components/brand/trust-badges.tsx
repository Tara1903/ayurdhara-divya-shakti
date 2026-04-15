import {
  FlaskConical,
  Leaf,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import type { TrustBadge } from "@/lib/storefront/home";

const ICONS = {
  flask: FlaskConical,
  leaf: Leaf,
  rotate: RotateCcw,
  shield: ShieldCheck,
  sparkles: Sparkles,
  truck: Truck,
} as const;

export function TrustBadges({ items }: { items: TrustBadge[] }) {
  return (
    <section className="page-shell section-space pb-12 pt-8">
      <div className="rounded-[30px] border border-[var(--color-line)] bg-white/72 p-4 shadow-[0_16px_44px_rgba(45,53,33,0.08)] backdrop-blur md:rounded-[36px] md:p-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
              Trust Signals
            </p>
            <h2 className="mt-2 font-serif-display text-[2rem] leading-[0.98] text-[var(--color-ink)] md:text-[2.7rem]">
              Premium signals users can scan in seconds.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--color-muted)] md:text-base md:leading-7">
            Visual proof beats long explanations on a shopping homepage.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
          {items.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? ShieldCheck;

            return (
              <div
                key={item.title}
                className="rounded-[22px] border border-[rgba(39,62,40,0.08)] bg-[rgba(255,255,255,0.9)] p-4 md:rounded-[24px]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(46,125,50,0.1)] text-[var(--color-forest)] md:h-11 md:w-11">
                  <Icon className="h-4.5 w-4.5 md:h-5 md:w-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-[var(--color-ink)] md:mt-4">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--color-muted)] md:text-sm md:leading-6">{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
