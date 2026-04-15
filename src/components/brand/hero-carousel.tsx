"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ThemeBackgroundLayer } from "@/components/brand/theme-background-layer";
import { buttonStyles } from "@/components/ui/button";
import { getProductShowcaseMeta } from "@/lib/storefront/showcase";
import { cn, formatCurrency } from "@/lib/utils";
import type { HomeHeroSlide } from "@/lib/storefront/home";

const AUTOPLAY_MS = 6000;

export function HeroCarousel({ slides }: { slides: HomeHeroSlide[] }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];

  function advanceSlide(direction: 1 | -1) {
    startTransition(() => {
      setActiveIndex((current) => (current + direction + slides.length) % slides.length);
    });
  }

  useEffect(() => {
    if (slides.length <= 1 || reduceMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((current) => (current + 1) % slides.length);
      });
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [reduceMotion, slides.length]);

  if (!activeSlide) {
    return null;
  }

  const meta = getProductShowcaseMeta(activeSlide.product);
  const priceSave =
    activeSlide.product.saveAmount ??
    Math.max(activeSlide.product.originalPrice - activeSlide.product.price, 0);

  return (
    <section className="relative isolate overflow-hidden">
      <ThemeBackgroundLayer theme={activeSlide.theme} />

      <div className="page-shell relative z-10 py-2 md:py-6">
        <div className="grid min-h-[calc(100svh-9.25rem)] items-center gap-5 md:gap-6 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="max-w-2xl space-y-4 py-3 md:space-y-7 md:py-4">
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[rgba(255,255,255,0.78)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-forest)]">
                  {activeSlide.eyebrow}
                </span>
                <span className="rounded-full bg-[rgba(17,41,25,0.82)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                  {meta.trustLabel}
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--color-gold)]">
                  AYURDHARA DIVYA SHAKTI
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                  >
                    <h1 className="max-w-2xl font-serif-display text-[2.25rem] leading-[0.94] text-[var(--color-ink)] sm:text-[3rem] md:text-[4.7rem]">
                      {activeSlide.title}
                    </h1>
                    <p className="max-w-xl text-sm leading-6 text-[rgba(24,35,24,0.74)] sm:text-base sm:leading-7 md:text-lg">
                      {activeSlide.subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/45 bg-white/62 p-4 shadow-[0_16px_38px_rgba(44,57,37,0.08)] backdrop-blur sm:hidden">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="font-semibold text-[var(--color-forest)]">
                  {formatCurrency(activeSlide.product.price)}
                </span>
                <span className="text-[var(--color-muted)]">•</span>
                <span className="font-medium text-[var(--color-gold)]">Save ₹{priceSave}</span>
                <span className="text-[var(--color-muted)]">•</span>
                <span className="inline-flex items-center gap-1 font-medium text-[var(--color-ink)]">
                  <Star className="h-4 w-4 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  {meta.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="hidden gap-3 sm:grid sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/45 bg-white/62 p-4 shadow-[0_16px_38px_rgba(44,57,37,0.08)] backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Price</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--color-forest)]">
                  {formatCurrency(activeSlide.product.price)}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/45 bg-white/62 p-4 shadow-[0_16px_38px_rgba(44,57,37,0.08)] backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Reviews</p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-semibold text-[var(--color-ink)]">
                  <Star className="h-5 w-5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  {meta.rating.toFixed(1)}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/45 bg-white/62 p-4 shadow-[0_16px_38px_rgba(44,57,37,0.08)] backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Offer</p>
                <p className="mt-2 text-2xl font-semibold text-[var(--color-gold)]">Save ₹{priceSave}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={activeSlide.primaryCtaHref}
                className={buttonStyles({ className: "w-full justify-center gap-2 sm:w-auto" })}
              >
                {activeSlide.primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={activeSlide.secondaryCtaHref}
                className={buttonStyles({ variant: "secondary", className: "w-full justify-center sm:w-auto" })}
              >
                {activeSlide.secondaryCtaLabel}
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {activeSlide.benefitChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/50 bg-white/62 px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] backdrop-blur sm:px-4 sm:py-2 sm:text-sm"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-2.5 py-2 text-left text-sm transition sm:px-3",
                    index === activeIndex
                      ? "border-transparent bg-[rgba(17,41,25,0.88)] text-white shadow-[0_12px_30px_rgba(25,43,27,0.14)]"
                      : "border-white/46 bg-white/56 text-[var(--color-ink)] hover:bg-white/76",
                  )}
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      index === activeIndex ? "bg-[var(--color-gold)]" : "bg-[rgba(46,125,50,0.3)]",
                    )}
                  />
                  <span className="hidden max-w-32 truncate sm:inline">{slide.product.category}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[38px] border border-white/36 bg-[rgba(255,255,255,0.44)] p-3 shadow-[0_28px_90px_rgba(33,48,28,0.18)] backdrop-blur-xl md:p-4">
              <div className="relative overflow-hidden rounded-[30px]">
                <div className="relative min-h-[20rem] sm:min-h-[24rem] md:min-h-[33rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeSlide.product.image}
                        alt={activeSlide.product.name}
                        fill
                        priority={activeIndex === 0}
                        sizes="(max-width: 1024px) 100vw, 56vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,13,0.82)] via-[rgba(10,22,13,0.12)] to-transparent" />

                <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-3 md:inset-x-4 md:top-4">
                  <div className="rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-[var(--color-forest)] shadow-sm sm:px-4 sm:py-2 sm:text-sm">
                    {activeSlide.product.badge ?? meta.badge ?? "Organic"}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => advanceSlide(-1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-[var(--color-ink)] shadow-sm sm:h-10 sm:w-10"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => advanceSlide(1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/88 text-[var(--color-ink)] shadow-sm sm:h-10 sm:w-10"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="absolute inset-x-3 bottom-3 space-y-3 rounded-[24px] border border-white/18 bg-[rgba(10,22,13,0.44)] p-4 text-white backdrop-blur-xl md:inset-x-6 md:bottom-6 md:space-y-4 md:rounded-[28px] md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-gold-soft)]">
                        {activeSlide.product.category}
                      </p>
                      <p className="mt-2 font-serif-display text-2xl leading-[0.98] sm:text-3xl md:text-4xl">
                        {activeSlide.product.name}
                      </p>
                    </div>
                    <div className="rounded-full bg-white/14 px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm">
                      {formatCurrency(activeSlide.product.price)}
                    </div>
                  </div>

                  <p className="max-w-2xl text-sm leading-6 text-white/84 md:text-base md:leading-7">
                    {activeSlide.product.shortBenefit}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {activeSlide.product.type === "wellness-kit" ? (
                      <>
                        <span className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white/92">
                          3 Nabhi Oils
                        </span>
                        <span className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white/92">
                          3 Feet Oils
                        </span>
                        <span className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white/92">
                          3 Herbal Powders
                        </span>
                      </>
                    ) : (
                      <span className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-medium text-white/92">
                        Premium Ayurvedic support
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mobile-scroll-row mt-4 hidden gap-3 overflow-x-auto pb-2 md:flex">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.id}-thumb`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "grid min-w-[11rem] grid-cols-[56px_1fr] items-center gap-3 rounded-[22px] border p-2 text-left transition",
                    index === activeIndex
                      ? "border-transparent bg-[rgba(17,41,25,0.86)] text-white shadow-[0_16px_38px_rgba(29,44,30,0.18)]"
                      : "border-white/42 bg-white/58 text-[var(--color-ink)]",
                  )}
                >
                  <div className="relative aspect-square overflow-hidden rounded-[16px]">
                    <Image
                      src={slide.product.image}
                      alt={slide.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-gold)]">
                      {slide.product.category}
                    </p>
                    <p className="truncate text-sm font-medium">{slide.product.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
