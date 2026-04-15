import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

export function TestimonialsStrip({ items }: { items: Testimonial[] }) {
  return (
    <section id="testimonials" className="page-shell section-space pt-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
            Social Proof
          </p>
          <h2 className="mt-2 font-serif-display text-[2.05rem] leading-[0.98] text-[var(--color-ink)] md:text-5xl">
            Short customer proof that supports the purchase.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[var(--color-muted)] md:text-base md:leading-7">
          Clean, direct, and product-connected, so trust builds without turning the page into a testimonial wall.
        </p>
      </div>

      <div className="mobile-scroll-row mt-7 flex gap-3 overflow-x-auto pb-3 md:mt-8 md:gap-4">
        {items.map((testimonial) => (
          <blockquote
            key={`${testimonial.name}-${testimonial.location}`}
            className="min-w-[16rem] max-w-[18rem] rounded-[24px] border border-[rgba(39,62,40,0.08)] bg-white/90 p-4 shadow-[0_18px_50px_rgba(36,47,30,0.08)] md:min-w-[18rem] md:max-w-[20rem] md:rounded-[28px] md:p-5"
          >
            <div className="flex gap-1 text-[var(--color-gold)]">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)] md:leading-7">“{testimonial.quote}”</p>
            <footer className="mt-5">
              <p className="font-semibold text-[var(--color-ink)]">{testimonial.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {testimonial.location}
              </p>
              {testimonial.concern ? (
                <p className="mt-2 text-xs font-medium text-[var(--color-forest)]">
                  {testimonial.concern}
                </p>
              ) : null}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
