import type { Metadata } from "next";
import { MessageCircle, PhoneCall } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Contact | ${BRAND.name}`,
  description:
    "Contact Ayurdhara Divya Shakti for wellness kit guidance, WhatsApp orders, and customer support.",
};

export default function ContactPage() {
  return (
    <section className="page-shell section-space">
      <div className="poster-surface rounded-[40px] px-6 py-10 md:px-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <p className="eyebrow">Contact</p>
            <h1 className="font-serif-display text-5xl leading-[0.92] text-[var(--color-ink)] md:text-6xl">
              Need help choosing the right wellness kit?
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Reach out for product guidance, order help, or questions about how the 9-in-1 ritual works.
            </p>
          </div>

          <div className="glass-panel rounded-[30px] p-6">
            <div className="grid gap-5">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)]">
                  <PhoneCall className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-[var(--color-ink)]">Call or WhatsApp</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{BRAND.supportPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-[var(--color-ink)]">Email</p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{BRAND.supportEmail}</p>
                </div>
              </div>
              <a
                href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
