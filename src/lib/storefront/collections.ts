import type { CollectionPageContent } from "@/types";

export const collectionPages: CollectionPageContent[] = [
  {
    slug: "wellness-kits",
    title: "Wellness Kits",
    eyebrow: "Main Collection",
    description:
      "The main revenue driver: complete 9-in-1 kits combining nabhi oils, feet oils, and herbal powders for guided daily balance.",
    heroTitle: "System-led Ayurvedic wellness kits built to make the routine easy to follow.",
    heroDescription:
      "Each kit is arranged as a 9-in-1 therapy system so the buyer sees one clear decision instead of scattered products.",
    type: "wellness-kit",
    highlight: "9-in-1 Complete Therapy Kit",
    featuredCategories: [
      "Purush Shakti",
      "Stree Arogya",
      "Bal Sanrakshan",
      "Vriddha Seva",
      "Parivar Swasthya",
      "Ayur Therapy",
    ],
  },
  {
    slug: "herbal-powders",
    title: "Herbal Powders",
    eyebrow: "Support Range",
    description:
      "Single-focus powder blends for immunity, hair care, skin balance, digestion, and energy support.",
    heroTitle: "Daily powders that support the inner side of the wellness ritual.",
    heroDescription:
      "These blends complement the kits or work as simple standalone support for disciplined daily routines.",
    type: "herbal-powder",
    highlight: "Powder-first daily support",
    featuredCategories: [
      "Immunity",
      "Hair Care",
      "Skin Care",
      "Digestion",
      "Energy",
    ],
  },
  {
    slug: "herbal-oils",
    title: "Herbal Oils",
    eyebrow: "Support Range",
    description:
      "Nabhi, feet, nasal, hair, and body oils made to support specific ritual points across the day.",
    heroTitle: "Purpose-led oils for focused, repeatable wellness moments.",
    heroDescription:
      "Choose oils by ritual point rather than guesswork: nabhi for balance, feet for grounding, and daily care for targeted support.",
    type: "herbal-oil",
    highlight: "Ritual-point oil system",
    featuredCategories: [
      "Nabhi Oils",
      "Feet Oils",
      "Nasal Oils",
      "Hair Oils",
      "Body Oils",
    ],
  },
  {
    slug: "raw-herbs",
    title: "Raw Herbs",
    eyebrow: "Foundational Ingredients",
    description:
      "Roots, leaves, fruits, seeds, bark, and flowers for customers who prefer ingredient-led buying.",
    heroTitle: "Raw Ayurvedic ingredients with a calm, premium presentation.",
    heroDescription:
      "For customers who know the herb they want and value clean sourcing-led presentation over cluttered commodity selling.",
    type: "raw-herb",
    highlight: "Single-origin herb selection",
    featuredCategories: ["Roots", "Leaves", "Fruits", "Seeds", "Bark", "Flowers"],
  },
  {
    slug: "combos",
    title: "Combos",
    eyebrow: "Bundles",
    description:
      "Curated bundle offers built around common goals like hair care, skin balance, immunity, weight rhythm, and family wellness.",
    heroTitle: "Bundle-led offers that make it easier to start a routine.",
    heroDescription:
      "Combos bring the right pieces together with simple pricing, visible savings, and clear reasons to buy now.",
    type: "combo",
    highlight: "Bundle savings + ritual clarity",
    featuredCategories: [
      "Hair Combo",
      "Skin Combo",
      "Immunity Combo",
      "Weight Loss Combo",
      "Family Combo",
    ],
  },
];

export function getCollectionContent(slug: string) {
  return collectionPages.find((collection) => collection.slug === slug) ?? null;
}
