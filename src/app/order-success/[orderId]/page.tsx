import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/utils";

type OrderSuccessPageProps = {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ number?: string }>;
};

export const metadata: Metadata = {
  title: `Order Success | ${BRAND.name}`,
  description: "Your Ayurdhara Divya Shakti wellness order has been received successfully.",
};

export default async function OrderSuccessPage({
  params,
  searchParams,
}: OrderSuccessPageProps) {
  const { orderId } = await params;
  const query = await searchParams;
  const orderNumber = query.number ?? orderId;

  return (
    <section className="page-shell section-space">
      <div className="section-frame mx-auto max-w-3xl px-6 py-12 text-center md:px-10">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--color-forest)] text-white">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <p className="mt-6 eyebrow">Order Confirmed</p>
        <h1 className="mt-4 font-serif-display text-5xl text-[var(--color-ink)]">
          Your wellness order is in.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[var(--color-muted)]">
          We have received your Cash on Delivery request and will follow up using
          the contact details you entered at checkout.
        </p>

        <div className="mt-8 rounded-[28px] bg-[var(--color-surface)] px-6 py-5">
          <p className="text-sm uppercase tracking-[0.26em] text-[var(--color-muted)]">
            Order Number
          </p>
          <p className="mt-2 font-serif-display text-4xl text-[var(--color-forest)]">
            {orderNumber}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/wellness-kits" className={buttonStyles()}>
            Continue Shopping
          </Link>
          <a
            href={buildWhatsAppUrl(
              BRAND.whatsappNumber,
              `Hi, I placed order ${orderNumber} for Ayurdhara Divya Shakti. Please share the next update.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-line)] bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--color-forest)]"
          >
            <MessageCircle className="h-4 w-4" />
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
