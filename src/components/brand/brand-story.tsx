import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BrandStoryContent } from "@/lib/storefront/home";

export function BrandStory({ story }: { story: BrandStoryContent }) {
  return (
    <section className="page-shell section-space pb-12 pt-4">
      <div className="grid gap-4 overflow-hidden rounded-[30px] border border-[rgba(39,62,40,0.08)] bg-[rgba(255,255,255,0.88)] shadow-[0_24px_72px_rgba(39,48,30,0.09)] md:gap-5 md:rounded-[36px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[14rem] overflow-hidden md:min-h-[18rem]">
          <Image
            src={story.image}
            alt={story.title}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 px-5 py-6 md:px-8 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
            {story.eyebrow}
          </p>
          <h2 className="max-w-2xl font-serif-display text-[2rem] leading-[0.98] text-[var(--color-ink)] md:text-[2.8rem]">
            {story.title}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)] md:text-base md:leading-7">{story.body}</p>
          <div>
            <Link
              href={story.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-forest)]"
            >
              {story.linkLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
