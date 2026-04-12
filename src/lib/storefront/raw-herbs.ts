import type { Product } from "@/types";
import { createRetailProduct } from "./shared";

export const rawHerbs: Product[] = [
  createRetailProduct({
    id: "raw_ashwagandha_root",
    slug: "ashwagandha-root-cut",
    name: "Ashwagandha Root Cut",
    type: "raw-herb",
    category: "Roots",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Root-format ashwagandha for customers who prefer ingredient-led buying.",
    description:
      "A raw herb option for customers who know the ingredient they want and prefer a cleaner, sourcing-led presentation.",
    problemStatement:
      "Useful for buyers who want ingredient control rather than a finished blend.",
    benefits: ["Ingredient-led purchase option", "Flexible home use", "Clean premium presentation"],
    ingredientsFeel: ["Earthy, root-led raw herb profile"],
    usageMethod: ["Use only in the format and quantity appropriate to your routine"],
    whoShouldUse: ["Ingredient-led buyers", "Experienced raw herb shoppers"],
    expectedTimeline: ["Supports ingredient-first wellness routines"],
    whatsInside: [{ name: "Ashwagandha Root Cut", purpose: "Raw root-format herb.", format: "100g" }],
    faqs: [
      {
        question: "Is this a ready-to-use kit product?",
        answer: "No. It belongs to the raw herb range for ingredient-led buying.",
      },
    ],
    price: 299,
    originalPrice: 369,
    badge: "Roots",
    limitedStockText: "Single-origin lot",
    supportLine: "Ingredient-first raw herb",
  }),
  createRetailProduct({
    id: "raw_tulsi_leaf",
    slug: "tulsi-dry-leaf",
    name: "Tulsi Dry Leaf",
    type: "raw-herb",
    category: "Leaves",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Dried tulsi leaf for ingredient-led immunity and tea-style rituals.",
    description:
      "A clean tulsi leaf format for customers who enjoy raw herbs as part of simpler home preparations.",
    problemStatement:
      "Suitable for buyers who want a more direct herb-buying experience.",
    benefits: ["Flexible herb-led use", "Tea and decoction-friendly", "Clean raw presentation"],
    ingredientsFeel: ["Fresh herbal leaf profile"],
    usageMethod: ["Use in the format that suits your routine and experience level"],
    whoShouldUse: ["Raw herb buyers", "Tea-led routine customers"],
    expectedTimeline: ["Supports ingredient-first routines"],
    whatsInside: [{ name: "Tulsi Dry Leaf", purpose: "Raw leaf-format herb.", format: "80g" }],
    faqs: [
      {
        question: "Can I buy this with the premium kit?",
        answer: "Yes. Many buyers add raw herbs to deepen the overall routine.",
      },
    ],
    price: 249,
    originalPrice: 319,
    badge: "Leaves",
    limitedStockText: "Freshly dried stock",
    supportLine: "Leaf-format raw herb",
    relatedSlugs: ["ayur-therapy-premium-immunity-kit"],
  }),
  createRetailProduct({
    id: "raw_amla_fruit",
    slug: "amla-whole-fruit",
    name: "Amla Whole Fruit",
    type: "raw-herb",
    category: "Fruits",
    image:
      "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Whole amla fruit option for customers who prefer ingredient-first buying.",
    description:
      "A raw fruit-format herb choice for buyers building their own Ayurvedic pantry.",
    problemStatement:
      "For customers who want simple, pantry-style herb buying rather than finished blends.",
    benefits: ["Pantry-friendly raw format", "Flexible wellness use", "Supports ingredient control"],
    ingredientsFeel: ["Bright fruit-led raw herb feel"],
    usageMethod: ["Use according to your preferred home-preparation method"],
    whoShouldUse: ["Raw herb buyers", "Families building home herb shelves"],
    expectedTimeline: ["Supports pantry-led buying habits"],
    whatsInside: [{ name: "Amla Whole Fruit", purpose: "Raw fruit-format herb.", format: "100g" }],
    faqs: [
      {
        question: "How is this different from the powder?",
        answer: "This is the raw fruit format, while the powder is a finished easy-use format.",
      },
    ],
    price: 259,
    originalPrice: 329,
    badge: "Fruits",
    limitedStockText: "Seasonal availability",
    supportLine: "Fruit-format raw herb",
  }),
  createRetailProduct({
    id: "raw_sesame_seed",
    slug: "black-sesame-seeds",
    name: "Black Sesame Seeds",
    type: "raw-herb",
    category: "Seeds",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Seed-format pantry herb for customers who like foundational ingredient buying.",
    description:
      "A raw seed option positioned for pantry-led Ayurveda buyers who prefer ingredient versatility.",
    problemStatement:
      "Suitable for shoppers building a more complete raw-ingredient shelf.",
    benefits: ["Versatile raw ingredient", "Premium pantry positioning", "Supports ingredient-led buying"],
    ingredientsFeel: ["Seed-rich raw pantry profile"],
    usageMethod: ["Use according to your preferred recipe or home routine"],
    whoShouldUse: ["Pantry builders", "Raw ingredient shoppers"],
    expectedTimeline: ["Supports flexible herb-led use"],
    whatsInside: [{ name: "Black Sesame Seeds", purpose: "Seed-format raw ingredient.", format: "150g" }],
    faqs: [
      {
        question: "Is this part of a combo?",
        answer: "No. It is sold as a raw ingredient for flexible buying.",
      },
    ],
    price: 219,
    originalPrice: 289,
    badge: "Seeds",
    limitedStockText: "Fresh pantry stock",
    supportLine: "Seed-format raw ingredient",
  }),
  createRetailProduct({
    id: "raw_arjuna_bark",
    slug: "arjuna-bark-cut",
    name: "Arjuna Bark Cut",
    type: "raw-herb",
    category: "Bark",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Bark-format raw herb for ingredient-led Ayurvedic buying.",
    description:
      "A bark-format herb option presented cleanly for buyers who know the ingredient they want.",
    problemStatement:
      "Best for customers looking for raw, simple herb formats with less marketing noise.",
    benefits: ["Ingredient-first presentation", "Pantry-friendly raw herb", "Supports flexible routine building"],
    ingredientsFeel: ["Bark-led earthy profile"],
    usageMethod: ["Use according to your home-preparation preference"],
    whoShouldUse: ["Raw herb shoppers", "Experienced home-preparation customers"],
    expectedTimeline: ["Supports ingredient-led buying"],
    whatsInside: [{ name: "Arjuna Bark Cut", purpose: "Bark-format raw herb.", format: "100g" }],
    faqs: [
      {
        question: "Why sell raw herbs alongside kits?",
        answer: "Because some customers want finished systems, while others prefer ingredient-led choices.",
      },
    ],
    price: 289,
    originalPrice: 359,
    badge: "Bark",
    limitedStockText: "Single-lot bark stock",
    supportLine: "Bark-format raw herb",
  }),
  createRetailProduct({
    id: "raw_rose_flower",
    slug: "rose-petal-dry",
    name: "Rose Petal Dry",
    type: "raw-herb",
    category: "Flowers",
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=80",
    shortBenefit: "Flower-format raw herb for beauty-led and tea-led home rituals.",
    description:
      "A flower-format raw herb with a softer premium feel for buyers who love sensory Ayurvedic rituals.",
    problemStatement:
      "For customers who want floral, beauty-leaning raw herb additions in the pantry.",
    benefits: ["Adds softness to raw-herb buying", "Beauty-led pantry option", "Premium floral presentation"],
    ingredientsFeel: ["Delicate floral raw herb profile"],
    usageMethod: ["Use in the format suited to your home ritual"],
    whoShouldUse: ["Beauty-led raw herb customers", "Tea and sensory-routine buyers"],
    expectedTimeline: ["Supports ingredient-first routine building"],
    whatsInside: [{ name: "Rose Petal Dry", purpose: "Flower-format raw herb.", format: "60g" }],
    faqs: [
      {
        question: "Is this meant for topical use?",
        answer: "It is sold as a raw herb ingredient, so use depends on your preferred preparation method.",
      },
    ],
    price: 239,
    originalPrice: 309,
    badge: "Flowers",
    limitedStockText: "Fresh floral lot",
    supportLine: "Flower-format raw herb",
  }),
];
