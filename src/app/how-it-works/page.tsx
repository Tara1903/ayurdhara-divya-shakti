import type { Metadata } from "next";
import { Droplets, Footprints, Leaf } from "lucide-react";
import { Reveal } from "@/components/brand/reveal";
import { SectionHeading } from "@/components/brand/section-heading";
import { BRAND } from "@/lib/brand";
import { howItWorks } from "@/lib/data";

export const metadata: Metadata = {
  title: `How It Works | ${BRAND.name}`,
  description:
    "Understand the 3-step Nabhi + Feet + Herbal Powder therapy ritual that powers the Ayurdhara Divya Shakti wellness system.",
};

const icons = [Droplets, Footprints, Leaf];

export default function HowItWorksPage() {
  return (
    <section className="page-shell section-space">
      <Reveal>
        <SectionHeading
          eyebrow="How It Works"
          title="A clear 3-step ritual designed to keep wellness simple."
          description="Apply Nabhi oil, massage feet oil, and take the herbal powder as part of a calm daily rhythm. The whole storefront is designed to make that logic feel easy."
        />
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {howItWorks.map((step, index) => {
          const Icon = icons[index];

          return (
            <Reveal key={step.step} delay={index * 0.05}>
              <article className="glass-panel rounded-[30px] p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[rgba(46,125,50,0.12)] text-[var(--color-forest)]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                  Step {step.step}
                </p>
                <h1 className="mt-3 font-serif-display text-4xl text-[var(--color-ink)]">
                  {step.title}
                </h1>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {step.description}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
