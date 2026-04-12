import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="page-shell section-space">
      <div className="section-frame mx-auto max-w-3xl px-6 py-12 text-center md:px-10">
        <p className="eyebrow">Page Not Found</p>
        <h1 className="mt-4 font-serif-display text-5xl text-[var(--color-ink)]">
          This page slipped out of the ritual.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--color-muted)]">
          Return to the storefront to explore the premium wellness kits and supporting Ayurvedic ranges.
        </p>
        <div className="mt-8">
          <Link href="/" className={buttonStyles()}>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
