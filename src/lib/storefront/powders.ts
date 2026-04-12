import type { Product } from "@/types";
import { createRetailProduct } from "./shared";

export const herbalPowders: Product[] = [
  createRetailProduct({
    id: "powder_amla_rasayan",
    slug: "amla-rasayan-powder",
    name: "Amla Rasayan Powder",
    type: "herbal-powder",
    category: "Immunity",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Daily immunity-support powder for a cleaner, lighter wellness routine.",
    description:
      "A simple amla-led powder designed for customers who want daily support in a clean, easy-to-repeat format.",
    problemStatement:
      "Best for customers looking for a gentle daily powder to support resilience and routine consistency.",
    benefits: [
      "Supports a simple daily immunity ritual",
      "Easy to pair with warm water, honey, or milk",
      "Useful as a support product alongside kits",
    ],
    ingredientsFeel: ["Amla-forward tart herbal feel", "Clean single-focus profile"],
    usageMethod: ["Use the recommended portion once daily", "Best taken with a steady routine"],
    whoShouldUse: [
      "Customers wanting a clean daily powder",
      "Shoppers pairing single powders with family wellness routines",
    ],
    expectedTimeline: ["Week 1: easier daily powder habit", "Weeks 2-4: steadier routine support"],
    whatsInside: [
      { name: "Amla Powder", purpose: "Supports daily resilience and routine balance.", format: "100g" },
    ],
    faqs: [
      {
        question: "Can this be paired with a wellness kit?",
        answer: "Yes. It works well as a simple support addition alongside the kit system.",
      },
    ],
    price: 399,
    originalPrice: 499,
    badge: "Daily Support",
    limitedStockText: "New harvest stock",
    supportLine: "Single-focus immunity powder",
    relatedSlugs: ["parivar-swasthya-9-in-1-wellness-kit"],
  }),
  createRetailProduct({
    id: "powder_keshya",
    slug: "keshya-hair-support-powder",
    name: "Keshya Hair Support Powder",
    type: "herbal-powder",
    category: "Hair Care",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Hair-care support powder for customers building an inside-out beauty ritual.",
    description:
      "A hair-focused support powder presented as part of a calm, disciplined beauty-wellness habit.",
    problemStatement:
      "Useful for customers who want to support scalp nourishment and hair-care routines from the inside out.",
    benefits: [
      "Supports a hair-focused daily ritual",
      "Pairs well with wellness kits and hair oils",
      "Keeps the routine simple and repeatable",
    ],
    ingredientsFeel: ["Herbal beauty-led flavor profile", "Routine-first positioning, not a quick-fix claim"],
    usageMethod: [
      "Take once daily with warm water or milk",
      "Use consistently with your broader beauty routine",
    ],
    whoShouldUse: ["Customers building hair-care routines", "Anyone pairing powders with beauty wellness products"],
    expectedTimeline: ["Weeks 1-2: easier routine consistency", "Weeks 3-4: supports stronger habit formation"],
    whatsInside: [
      { name: "Hair Support Powder Blend", purpose: "Supports beauty-wellness rituals.", format: "100g" },
    ],
    faqs: [
      {
        question: "Does this replace hair oil?",
        answer: "No. It is best used as a support layer within a fuller hair routine.",
      },
    ],
    price: 449,
    originalPrice: 549,
    badge: "Beauty Ritual",
    limitedStockText: "Limited salon-style batch",
    supportLine: "Inside-out beauty support powder",
    relatedSlugs: ["keshya-hair-oil", "stree-arogya-9-in-1-wellness-kit"],
  }),
  createRetailProduct({
    id: "powder_lodhra",
    slug: "lodhra-skin-balance-powder",
    name: "Lodhra Skin Balance Powder",
    type: "herbal-powder",
    category: "Skin Care",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Skin-balance powder for customers building a calm beauty-from-within routine.",
    description:
      "A skin-care support powder designed to complement premium beauty and women’s wellness rituals.",
    problemStatement:
      "For customers wanting a gentler inner-support approach alongside skin care routines.",
    benefits: [
      "Supports a calmer, beauty-led powder habit",
      "Pairs naturally with women’s wellness rituals",
      "Easy to add to a daily routine",
    ],
    ingredientsFeel: ["Classic Ayurvedic beauty-support feel"],
    usageMethod: ["Use the daily portion with warm water or milk"],
    whoShouldUse: ["Beauty-led wellness customers", "Women’s ritual buyers"],
    expectedTimeline: ["Weeks 1-2: easier daily consistency"],
    whatsInside: [
      { name: "Lodhra Blend", purpose: "Supports beauty-from-within rituals.", format: "80g" },
    ],
    faqs: [
      {
        question: "Is this meant to make cosmetic claims?",
        answer: "No. It is positioned only as support within a broader wellness routine.",
      },
    ],
    price: 449,
    originalPrice: 549,
    badge: "Glow Support",
    limitedStockText: "Fresh beauty batch",
    supportLine: "Skin-balance powder for daily rituals",
    relatedSlugs: ["stree-arogya-9-in-1-wellness-kit"],
  }),
  createRetailProduct({
    id: "powder_jeera_digestive",
    slug: "jeera-digestive-comfort-powder",
    name: "Jeera Digestive Comfort Powder",
    type: "herbal-powder",
    category: "Digestion",
    image:
      "https://images.unsplash.com/photo-1523906630133-f6934a1ab2b9?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Digestive-support powder for customers who want an easy daily comfort ritual.",
    description:
      "A digestion-led powder that supports everyday comfort and pairs naturally with nabhi-centered routines.",
    problemStatement:
      "Useful for buyers focused on digestion support, lighter evenings, and a more complete family-care routine.",
    benefits: [
      "Supports digestive comfort habits",
      "Pairs well with nabhi oil routines",
      "Simple daily portion and format",
    ],
    ingredientsFeel: ["Warm digestive kitchen-herb feel"],
    usageMethod: ["Use the daily portion after a meal or as directed"],
    whoShouldUse: ["Digestive-routine customers", "Family-care buyers"],
    expectedTimeline: ["Weeks 1-2: easier routine habit"],
    whatsInside: [
      { name: "Jeera Digestive Blend", purpose: "Supports digestion-led daily balance.", format: "100g" },
    ],
    faqs: [
      {
        question: "Can I pair this with the family kit?",
        answer: "Yes. It fits especially well with family and digestion-focused routines.",
      },
    ],
    price: 379,
    originalPrice: 479,
    badge: "Digestive Support",
    limitedStockText: "Fast-moving stock",
    supportLine: "Daily digestive balance powder",
    relatedSlugs: ["parivar-swasthya-9-in-1-wellness-kit", "nabhik-digestive-support-oil"],
  }),
  createRetailProduct({
    id: "powder_moringa_energy",
    slug: "moringa-energy-blend",
    name: "Moringa Energy Blend",
    type: "herbal-powder",
    category: "Energy",
    image:
      "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Everyday energy-support powder for customers who want a simpler morning ritual.",
    description:
      "A clean moringa-led powder blend positioned for everyday vitality and steadier wellness habits.",
    problemStatement:
      "For customers who want to support daily lightness, energy, and general balance without cluttering the routine.",
    benefits: [
      "Supports a cleaner morning ritual",
      "Pairs with men’s and senior routines",
      "Simple single-blend format",
    ],
    ingredientsFeel: ["Green, earthy moringa-forward feel"],
    usageMethod: ["Use once daily with warm water, juice, or smoothies"],
    whoShouldUse: ["Energy-seeking buyers", "Men and senior-care customers"],
    expectedTimeline: ["Weeks 1-2: easier morning consistency"],
    whatsInside: [
      { name: "Moringa Blend", purpose: "Supports everyday vitality routines.", format: "100g" },
    ],
    faqs: [
      {
        question: "Can I use it if I also take a kit powder?",
        answer: "Yes, but keep the routine measured and avoid unnecessary overlap.",
      },
    ],
    price: 429,
    originalPrice: 529,
    badge: "Morning Ritual",
    limitedStockText: "Fresh grind available",
    supportLine: "Clean energy-support powder",
    relatedSlugs: ["purush-shakti-9-in-1-wellness-kit", "vriddha-seva-9-in-1-wellness-kit"],
  }),
];
