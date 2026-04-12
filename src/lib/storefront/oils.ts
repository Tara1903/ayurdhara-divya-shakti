import type { Product } from "@/types";
import { createRetailProduct } from "./shared";

export const herbalOils: Product[] = [
  createRetailProduct({
    id: "oil_nabhi_digestive",
    slug: "nabhik-digestive-support-oil",
    name: "Nabhik Digestive Support Oil",
    type: "herbal-oil",
    category: "Nabhi Oils",
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Focused nabhi oil for customers who want digestion-led nightly support.",
    description:
      "A digestion-focused nabhi oil positioned as part of a disciplined night routine for internal balance.",
    problemStatement:
      "Useful for customers who want a simple starting point in nabhi oil rituals with a digestion focus.",
    benefits: [
      "Supports a clear nightly nabhi step",
      "Good entry point into nabhi rituals",
      "Pairs well with family and digestion-led products",
    ],
    ingredientsFeel: ["Warm digestive aroma profile"],
    usageMethod: ["Apply 2-3 drops in the navel before sleep"],
    whoShouldUse: ["Nabhi ritual beginners", "Digestive-routine customers"],
    expectedTimeline: ["Week 1: easier nightly ritual habit"],
    whatsInside: [
      { name: "Digestive Support Nabhi Oil", purpose: "Supports digestion-led nightly balance.", format: "15ml" },
    ],
    faqs: [
      {
        question: "Can I use this with a powder?",
        answer: "Yes. It pairs naturally with digestion-support powders.",
      },
    ],
    price: 349,
    originalPrice: 449,
    badge: "Core Ritual",
    limitedStockText: "Small-batch oil",
    supportLine: "Single-point nabhi ritual support",
    relatedSlugs: ["jeera-digestive-comfort-powder", "parivar-swasthya-9-in-1-wellness-kit"],
  }),
  createRetailProduct({
    id: "oil_feet_relax",
    slug: "feet-relax-grounding-oil",
    name: "Feet Relax Grounding Oil",
    type: "herbal-oil",
    category: "Feet Oils",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Grounding feet oil for customers who want a calmer pre-sleep ritual.",
    description:
      "A feet massage oil designed to make evening routines feel softer, calmer, and easier to repeat.",
    problemStatement:
      "Best for buyers who want a simple, soothing nighttime step with a premium feel.",
    benefits: [
      "Supports grounding evening rituals",
      "Easy add-on for almost every kit",
      "Useful as a standalone wind-down product",
    ],
    ingredientsFeel: ["Relaxing, comfort-led evening aroma"],
    usageMethod: ["Massage into the soles before sleep"],
    whoShouldUse: ["Sleep-routine customers", "Anyone wanting calmer evenings"],
    expectedTimeline: ["Week 1: easier bedtime consistency"],
    whatsInside: [
      { name: "Grounding Feet Oil", purpose: "Supports relaxed bedtime routines.", format: "30ml" },
    ],
    faqs: [
      {
        question: "Can I use this with any kit?",
        answer: "Yes. It works well as a supportive step across the wider range.",
      },
    ],
    price: 379,
    originalPrice: 479,
    badge: "Evening Favorite",
    limitedStockText: "Evening batch almost gone",
    supportLine: "Simple grounding feet ritual",
    relatedSlugs: ["purush-shakti-9-in-1-wellness-kit", "stree-arogya-9-in-1-wellness-kit"],
  }),
  createRetailProduct({
    id: "oil_nasal",
    slug: "nasal-clarity-support-oil",
    name: "Nasal Clarity Support Oil",
    type: "herbal-oil",
    category: "Nasal Oils",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Supportive nasal ritual oil for customers who want a more complete wellness routine.",
    description:
      "A nasal ritual support oil positioned for customers who value a broader, more layered Ayurvedic self-care system.",
    problemStatement:
      "Best suited to customers who already enjoy ritual-led wellness and want to expand it thoughtfully.",
    benefits: [
      "Supports a more complete ritual stack",
      "Pairs well with premium and immunity-led buys",
      "Presented as a support product, not a claim-heavy treatment",
    ],
    ingredientsFeel: ["Refreshing, herbal clarity-led feel"],
    usageMethod: ["Use only as directed and in measured quantity"],
    whoShouldUse: ["Ritual-led wellness buyers", "Customers expanding their self-care system"],
    expectedTimeline: ["Supports routine completeness from first use"],
    whatsInside: [
      { name: "Nasal Support Oil", purpose: "Supports a broader Ayurvedic routine.", format: "10ml" },
    ],
    faqs: [
      {
        question: "Is this part of the kits?",
        answer: "No. It sits in the oil range as an optional ritual expansion product.",
      },
    ],
    price: 299,
    originalPrice: 399,
    badge: "Ritual Add-On",
    limitedStockText: "Limited clarity batch",
    supportLine: "Optional routine-expansion oil",
    relatedSlugs: ["ayur-therapy-premium-immunity-kit"],
  }),
  createRetailProduct({
    id: "oil_hair",
    slug: "keshya-hair-oil",
    name: "Keshya Hair Oil",
    type: "herbal-oil",
    category: "Hair Oils",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Hair ritual oil that complements beauty and inside-out care routines.",
    description:
      "A premium hair oil created to sit naturally alongside hair powders and women’s wellness kits.",
    problemStatement:
      "For customers who want a layered beauty-care ritual that feels calm, premium, and easy to repeat.",
    benefits: [
      "Supports a fuller beauty-wellness routine",
      "Pairs well with hair support powders",
      "Adds a premium texture to home care",
    ],
    ingredientsFeel: ["Classic Ayurvedic hair-oil feel with smooth finish"],
    usageMethod: ["Massage into scalp or hair lengths before wash or as directed"],
    whoShouldUse: ["Hair-care buyers", "Beauty-routine customers"],
    expectedTimeline: ["Week 1: easier ritual consistency"],
    whatsInside: [
      { name: "Hair Ritual Oil", purpose: "Supports consistent beauty-wellness habits.", format: "50ml" },
    ],
    faqs: [
      {
        question: "Can this be paired with the women’s kit?",
        answer: "Yes. It complements the broader self-care positioning of the women’s range.",
      },
    ],
    price: 449,
    originalPrice: 549,
    badge: "Beauty Add-On",
    limitedStockText: "Popular this week",
    supportLine: "Premium hair ritual oil",
    relatedSlugs: ["keshya-hair-support-powder", "stree-arogya-9-in-1-wellness-kit"],
  }),
  createRetailProduct({
    id: "oil_body",
    slug: "body-relief-oil",
    name: "Body Relief Oil",
    type: "herbal-oil",
    category: "Body Oils",
    image:
      "https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Supportive body oil for post-work heaviness, comfort rituals, and evening ease.",
    description:
      "A body massage oil created for customers who want a straightforward comfort-led ritual after demanding days.",
    problemStatement:
      "Suitable for buyers wanting an easier comfort routine for body heaviness and evening wind-down moments.",
    benefits: [
      "Supports a full-body comfort ritual",
      "Pairs well with feet oils and senior-care products",
      "Simple, premium-feeling support step",
    ],
    ingredientsFeel: ["Warm massage-oil profile for evening use"],
    usageMethod: ["Massage onto targeted areas as part of an evening routine"],
    whoShouldUse: ["Body-care buyers", "Senior and recovery-focused customers"],
    expectedTimeline: ["Week 1: stronger ritual consistency"],
    whatsInside: [
      { name: "Body Relief Oil", purpose: "Supports comfort-led massage routines.", format: "60ml" },
    ],
    faqs: [
      {
        question: "Is this meant to make medical claims?",
        answer: "No. It is positioned only as support within a routine-led comfort ritual.",
      },
    ],
    price: 399,
    originalPrice: 499,
    badge: "Comfort Ritual",
    limitedStockText: "Warm oil batch available",
    supportLine: "Evening comfort oil for massage rituals",
    relatedSlugs: ["vriddha-seva-9-in-1-wellness-kit", "feet-relax-grounding-oil"],
  }),
];
