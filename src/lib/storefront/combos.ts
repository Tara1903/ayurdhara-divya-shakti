import type { Product } from "@/types";
import { createRetailProduct } from "./shared";

export const combos: Product[] = [
  createRetailProduct({
    id: "combo_hair",
    slug: "hair-ritual-combo",
    name: "Hair Ritual Combo",
    type: "combo",
    category: "Hair Combo",
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Hair-focused bundle with powder and oil support for a cleaner routine.",
    description:
      "A conversion-led combo for customers who want a simple hair-care bundle without choosing every item individually.",
    problemStatement:
      "Useful for shoppers who want a ready-made bundle for hair wellness rituals.",
    benefits: ["Makes buying easier", "Shows visible bundle value", "Pairs oil and powder support in one offer"],
    ingredientsFeel: ["Beauty-led bundle positioning"],
    usageMethod: ["Use the oil and powder as part of a weekly-plus-daily routine split"],
    whoShouldUse: ["Hair-care shoppers", "Beauty-routine buyers"],
    expectedTimeline: ["Supports habit-building through one bundle decision"],
    whatsInside: [
      { name: "Keshya Hair Oil", purpose: "Supports scalp and hair rituals.", format: "50ml" },
      { name: "Keshya Hair Support Powder", purpose: "Supports inside-out beauty rituals.", format: "100g" },
    ],
    faqs: [
      {
        question: "Why buy the combo instead of separately?",
        answer: "It keeps the decision simpler and highlights bundle value immediately.",
      },
    ],
    price: 799,
    originalPrice: 999,
    badge: "Save ₹200",
    limitedStockText: "Bundle offer live now",
    supportLine: "Bundle built for hair routine buyers",
    relatedSlugs: ["keshya-hair-oil", "keshya-hair-support-powder"],
  }),
  createRetailProduct({
    id: "combo_skin",
    slug: "skin-balance-combo",
    name: "Skin Balance Combo",
    type: "combo",
    category: "Skin Combo",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Skin-support bundle designed for women’s and beauty-led wellness routines.",
    description:
      "A simple two-piece bundle built to reduce decision friction for glow and beauty-routine shoppers.",
    problemStatement:
      "Best for customers who want a lighter beauty-led bundle without entering the full kit system yet.",
    benefits: ["Simple bundle value", "Beauty-led support pairing", "Easy gifting potential"],
    ingredientsFeel: ["Soft glow-routine positioning"],
    usageMethod: ["Use as part of a simple daily or weekly beauty-support routine"],
    whoShouldUse: ["Beauty buyers", "Women’s wellness shoppers"],
    expectedTimeline: ["Supports easier bundle-led consistency"],
    whatsInside: [
      { name: "Lodhra Skin Balance Powder", purpose: "Supports beauty-from-within habits.", format: "80g" },
      { name: "Feet Relax Grounding Oil", purpose: "Supports calm evenings and routine softness.", format: "30ml" },
    ],
    faqs: [
      {
        question: "Is this the same as the women’s kit?",
        answer: "No. It is a smaller, lighter bundle for easier entry into the range.",
      },
    ],
    price: 749,
    originalPrice: 949,
    badge: "Bundle Offer",
    limitedStockText: "Popular gifting combo",
    supportLine: "Beauty-led support combo",
    relatedSlugs: ["lodhra-skin-balance-powder", "stree-arogya-9-in-1-wellness-kit"],
  }),
  createRetailProduct({
    id: "combo_immunity",
    slug: "immunity-support-combo",
    name: "Immunity Support Combo",
    type: "combo",
    category: "Immunity Combo",
    image:
      "https://images.unsplash.com/photo-1543364195-bfe6e4932397?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Immunity-led bundle that pairs powder and oil support in one clean offer.",
    description:
      "A straightforward combo for shoppers seeking a smaller support bundle before stepping into the premium kit range.",
    problemStatement:
      "For buyers focused on resilience and daily balance who want an easier first purchase.",
    benefits: ["Fast decision path", "Visible savings", "Clear immunity-led positioning"],
    ingredientsFeel: ["Resilience-led support pair"],
    usageMethod: ["Use as part of a daily powder plus nightly oil rhythm"],
    whoShouldUse: ["First-time buyers", "Immunity-focused shoppers"],
    expectedTimeline: ["Supports easier daily routine start"],
    whatsInside: [
      { name: "Amla Rasayan Powder", purpose: "Supports resilience-led daily habits.", format: "100g" },
      { name: "Nabhik Digestive Support Oil", purpose: "Supports nightly balance rituals.", format: "15ml" },
    ],
    faqs: [
      {
        question: "Should I buy this or the premium immunity kit?",
        answer: "Choose the combo for a lighter entry point and the premium kit for the full 9-in-1 system.",
      },
    ],
    price: 699,
    originalPrice: 899,
    badge: "Save ₹200",
    limitedStockText: "Starter combo in stock",
    supportLine: "Starter immunity support bundle",
    relatedSlugs: ["amla-rasayan-powder", "ayur-therapy-premium-immunity-kit"],
  }),
  createRetailProduct({
    id: "combo_weight",
    slug: "weight-rhythm-combo",
    name: "Weight Rhythm Combo",
    type: "combo",
    category: "Weight Loss Combo",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Routine-support combo for customers seeking lighter daily discipline and digestive support.",
    description:
      "A combo built around routine rhythm, digestive support, and disciplined daily habits rather than aggressive promises.",
    problemStatement:
      "Useful for customers who want simple support products around lighter living and routine balance.",
    benefits: ["Promotes routine clarity", "Visible bundle savings", "Keeps claims responsible"],
    ingredientsFeel: ["Light, digestive support positioning"],
    usageMethod: ["Use as part of a measured daily support routine"],
    whoShouldUse: ["Routine-discipline buyers", "Digestive-balance shoppers"],
    expectedTimeline: ["Supports cleaner routine-building"],
    whatsInside: [
      { name: "Jeera Digestive Comfort Powder", purpose: "Supports lighter digestive routines.", format: "100g" },
      { name: "Feet Relax Grounding Oil", purpose: "Supports calm evenings and habit discipline.", format: "30ml" },
    ],
    faqs: [
      {
        question: "Does this make strong transformation claims?",
        answer: "No. It is framed only as support for disciplined wellness routines.",
      },
    ],
    price: 699,
    originalPrice: 899,
    badge: "Bundle Offer",
    limitedStockText: "Limited bundle slots",
    supportLine: "Routine-led digestive support combo",
    relatedSlugs: ["jeera-digestive-comfort-powder", "feet-relax-grounding-oil"],
  }),
  createRetailProduct({
    id: "combo_family",
    slug: "family-daily-combo",
    name: "Family Daily Combo",
    type: "combo",
    category: "Family Combo",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Family-friendly combo for immunity, digestion, and calmer daily support habits.",
    description:
      "A practical combo that helps a household start the brand through a simpler bundle before moving into a full kit.",
    problemStatement:
      "Ideal for families wanting a lighter commitment than a full 9-in-1 kit while still getting real system cues.",
    benefits: ["Good entry bundle for households", "Visible savings at a lower ticket", "Supports daily balance habits"],
    ingredientsFeel: ["Family-led, balanced routine positioning"],
    usageMethod: ["Use as a lighter home wellness bundle with a simple rhythm"],
    whoShouldUse: ["Families", "Entry-level buyers", "Household wellness shoppers"],
    expectedTimeline: ["Supports routine adoption from the first week"],
    whatsInside: [
      { name: "Amla Rasayan Powder", purpose: "Supports daily resilience rituals.", format: "100g" },
      { name: "Feet Relax Grounding Oil", purpose: "Supports calmer evenings at home.", format: "30ml" },
      { name: "Tulsi Dry Leaf", purpose: "Adds an ingredient-led household ritual layer.", format: "80g" },
    ],
    faqs: [
      {
        question: "Why choose this instead of the family kit?",
        answer: "Choose this for a smaller starting bundle and the family kit for the full 9-in-1 system.",
      },
    ],
    price: 899,
    originalPrice: 1099,
    badge: "Most Shared",
    limitedStockText: "Family combo moving fast",
    supportLine: "Family entry bundle with visible savings",
    relatedSlugs: ["parivar-swasthya-9-in-1-wellness-kit", "amla-rasayan-powder"],
  }),
];

export const comboHighlightSlugs = [
  "hair-ritual-combo",
  "skin-balance-combo",
  "immunity-support-combo",
];
