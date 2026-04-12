import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { buildWhatsAppUrl } from "@/lib/utils";

export function StickyWhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(BRAND.whatsappNumber, BRAND.whatsappOrderMessage)}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-3 rounded-full bg-[var(--color-forest)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(24,68,40,0.34)] hover:-translate-y-0.5 md:bottom-6 md:right-6"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/16">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline">Order on WhatsApp</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}
