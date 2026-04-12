import type { Product } from "@/types";
import { createKit, createTherapyItems } from "./shared";

export const wellnessKits: Product[] = [
  createKit({
    id: "kit_purush_shakti",
    slug: "purush-shakti-9-in-1-wellness-kit",
    name: "Purush Shakti 9-in-1 Wellness Kit",
    category: "Purush Shakti",
    subcategory: "Men Wellness",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    shortBenefit:
      "Men’s daily support for energy, digestion, stress balance, and stronger nightly recovery.",
    description:
      "A premium 9-in-1 wellness kit that combines three nabhi oils, three feet oils, and three herbal powders into one guided men’s routine.",
    problemStatement:
      "Designed for men dealing with fatigue, digestive inconsistency, stress build-up, post-work heaviness, and the need for a cleaner daily rhythm.",
    benefits: [
      "Supports stable energy and routine discipline",
      "Helps the body feel calmer at night",
      "Supports digestive comfort and daily balance",
      "Creates a repeatable bedtime recovery ritual",
      "Feels more complete than buying separate products",
    ],
    ingredientsFeel: [
      "Grounding herb-infused nabhi oils with warming notes",
      "Deep relax feet oils with calm, comfort-led aroma",
      "Powder support built around ashwagandha, safed musli, and moringa-inspired routines",
    ],
    usageMethod: [
      "Apply the selected nabhi oil before sleep",
      "Massage the recommended feet oil into the soles",
      "Use the daily powder portion with warm water or milk",
    ],
    whoShouldUse: [
      "Men with demanding schedules",
      "Anyone looking for a stronger bedtime recovery ritual",
      "Customers who want a complete daily support system instead of isolated products",
    ],
    expectedTimeline: [
      "Week 1: the ritual feels grounding and easier to follow",
      "Week 2: supports better bedtime discipline and steadier routine comfort",
      "Weeks 3-6: supports a more balanced daily rhythm",
    ],
    whatsInside: createTherapyItems(
      ["Energy Nabhi Oil", "Digestive Nabhi Oil", "Stress Nabhi Oil"],
      ["Muscle Relax Feet Oil", "Nerve Support Feet Oil", "Deep Relax Feet Oil"],
      ["Ashwagandha Powder", "Safed Musli Powder", "Moringa Powder"],
    ),
    faqs: [
      {
        question: "Is this positioned as a medicine?",
        answer:
          "No. It is positioned as a wellness-support routine built to help you stay consistent with daily balance practices.",
      },
      {
        question: "Why is it called a 9-in-1 system?",
        answer:
          "Because each kit includes 3 nabhi oils, 3 feet oils, and 3 herbal powders arranged as one guided routine.",
      },
    ],
    badge: "Best Seller",
    limitedStockText: "Limited stock in current batch",
    supportLine: "9-in-1 complete therapy kit for men’s daily balance",
    relatedSlugs: ["immunity-support-combo", "nabhik-digestive-support-oil"],
    seoTitle: "Purush Shakti Ayurvedic Wellness Kit | AYURDHARA DIVYA SHAKTI",
    seoDescription:
      "Premium Ayurvedic wellness kit for men with nabhi oils, feet oils, and herbal powders supporting energy, digestion, and stress balance.",
  }),
  createKit({
    id: "kit_stree_arogya",
    slug: "stree-arogya-9-in-1-wellness-kit",
    name: "Stree Arogya 9-in-1 Wellness Kit",
    category: "Stree Arogya",
    subcategory: "Women Wellness",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    shortBenefit:
      "Women’s ritual support for calm cycles, skin balance, daily ease, and evening relaxation.",
    description:
      "A premium 9-in-1 system combining focused nabhi oils, calming feet oils, and traditional herbal powders for women’s daily wellness rituals.",
    problemStatement:
      "Built for customers looking to support calm cycles, smoother daily balance, skin freshness, emotional ease, and bedtime recovery.",
    benefits: [
      "Supports calm, consistent wellness rituals",
      "Helps support skin and daily glow from the inside out",
      "Supports softer evenings and grounded rest",
      "Offers a more premium alternative to scattered beauty-wellness buys",
      "Makes routine care easier to stay consistent with",
    ],
    ingredientsFeel: [
      "Hormone-support-inspired nabhi oils with balanced floral notes",
      "Cooling and circulation-support feet oils for evening comfort",
      "Powder trio inspired by shatavari, lodhra, and ashoka-style support",
    ],
    usageMethod: [
      "Choose the suggested nabhi oil for the evening",
      "Massage a light layer of feet oil before bed",
      "Take the daily powder blend as directed with warm water or milk",
    ],
    whoShouldUse: [
      "Women building a structured self-care ritual",
      "Customers who want wellness-led support without loud claims",
      "Anyone drawn to skin, stress, and cycle balance support",
    ],
    expectedTimeline: [
      "Week 1: calmer nightly rhythm",
      "Week 2: supports a more regular self-care habit",
      "Weeks 3-6: helps the routine feel more stable and complete",
    ],
    whatsInside: createTherapyItems(
      ["Hormone Nabhi Oil", "Skin Nabhi Oil", "Stress Nabhi Oil"],
      ["Relax Feet Oil", "Circulation Feet Oil", "Cooling Feet Oil"],
      ["Shatavari Powder", "Lodhra Powder", "Ashoka Powder"],
    ),
    faqs: [
      {
        question: "Can this be used alongside skincare and other routines?",
        answer:
          "Yes. It is designed as a supportive ritual that can sit alongside broader self-care practices.",
      },
      {
        question: "Is the routine complicated?",
        answer:
          "No. The idea is to keep it simple: nabhi oil, feet oil, and a powder rhythm that fits daily life.",
      },
    ],
    badge: "Most Popular",
    limitedStockText: "Fresh women’s wellness batch",
    supportLine: "9-in-1 complete therapy kit for women’s daily balance",
    relatedSlugs: ["skin-balance-combo", "keshya-hair-support-powder"],
    seoTitle: "Stree Arogya Ayurvedic Wellness Kit | AYURDHARA DIVYA SHAKTI",
    seoDescription:
      "Ayurvedic women wellness kit with nabhi oils, feet oils, and herbal powders supporting calm cycles, skin balance, and bedtime ease.",
  }),
  createKit({
    id: "kit_bal_sanrakshan",
    slug: "bal-sanrakshan-9-in-1-wellness-kit",
    name: "Bal Sanrakshan 9-in-1 Wellness Kit",
    category: "Bal Sanrakshan",
    subcategory: "Child Wellness",
    image:
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1200&q=80",
    shortBenefit:
      "Gentle child wellness support with mild oils and low-dose powders for bedtime and daily routine care.",
    description:
      "A child-focused 9-in-1 therapy kit using mild ritual choices across nabhi oils, feet oils, and supportive herbal powders for age 2-12 guidance.",
    problemStatement:
      "Made for parents who want a gentle wellness routine to support appetite rhythm, immunity support, calmer nights, and routine comfort.",
    benefits: [
      "Supports a calmer family bedtime routine",
      "Helps parents stay consistent without complexity",
      "Supports gentle immunity and digestive comfort practices",
      "Uses softer ritual language and milder product positioning",
      "Keeps the family buying decision simple and structured",
    ],
    ingredientsFeel: [
      "Mild oils designed for gentle bedtime rituals",
      "Feet oils focused on calm and cooling comfort",
      "Low-dose powder support inspired by amla, brahmi, and mulethi",
    ],
    usageMethod: [
      "Use very small drops for nabhi and feet ritual points",
      "Apply under caregiver supervision before sleep",
      "Use the daily powder portion only as directed",
    ],
    whoShouldUse: [
      "Parents of children aged 2-12 years",
      "Families preferring mild ritual-led support",
      "Customers wanting a calmer child-focused wellness routine",
    ],
    expectedTimeline: [
      "Week 1: easier bedtime rhythm",
      "Week 2: supports better routine consistency",
      "Weeks 3-6: helps the family settle into a calmer pattern",
    ],
    whatsInside: createTherapyItems(
      ["Mild Calm Nabhi Oil", "Mild Digestive Nabhi Oil", "Mild Comfort Nabhi Oil"],
      ["Soft Relax Feet Oil", "Cooling Feet Oil", "Sleep Ease Feet Oil"],
      ["Amla Powder", "Brahmi Powder", "Mulethi Powder"],
    ),
    faqs: [
      {
        question: "Is this intended to replace medical advice?",
        answer:
          "No. It is positioned as a gentle wellness-support ritual, not a treatment replacement.",
      },
      {
        question: "Why are the powders described as low-dose?",
        answer:
          "Because child wellness routines should stay gentle, simple, and parent-guided.",
      },
    ],
    badge: "Gentle Care",
    limitedStockText: "Low-stock child wellness batch",
    supportLine: "9-in-1 complete therapy kit for child wellness support",
    relatedSlugs: ["family-daily-combo", "amla-rasayan-powder"],
  }),
  createKit({
    id: "kit_vriddha_seva",
    slug: "vriddha-seva-9-in-1-wellness-kit",
    name: "Vriddha Seva 9-in-1 Wellness Kit",
    category: "Vriddha Seva",
    subcategory: "Senior Care",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    shortBenefit:
      "Senior-care support for comfort, circulation, joint ease, and a calmer nightly ritual.",
    description:
      "A premium 9-in-1 senior-care wellness system that brings together comfort-led oils and steady powder support in one respectful daily routine.",
    problemStatement:
      "Designed for families supporting seniors who want gentler movement comfort, warm circulation support, and less fragmented nightly care.",
    benefits: [
      "Supports a calmer senior-care ritual",
      "Helps the routine feel comforting rather than complicated",
      "Supports circulation and joint-ease rituals",
      "Works well for caregivers managing daily consistency",
      "Feels more premium than buying isolated comfort products",
    ],
    ingredientsFeel: [
      "Comfort-focused nabhi oils for warmth and balance",
      "Feet oils positioned around relaxation and circulation",
      "Powders inspired by moringa, turmeric, and ashwagandha support",
    ],
    usageMethod: [
      "Use the selected nabhi oil before bedtime",
      "Massage feet oil into the soles and lower feet",
      "Add the recommended powder portion to the daily routine",
    ],
    whoShouldUse: [
      "Senior customers wanting a calm daily ritual",
      "Families creating a structured evening support routine",
      "Caregivers looking for easy-to-follow wellness support",
    ],
    expectedTimeline: [
      "Week 1: a more soothing nighttime ritual",
      "Week 2: supports steadier comfort habits",
      "Weeks 3-6: helps the routine feel more dependable",
    ],
    whatsInside: createTherapyItems(
      ["Joint Nabhi Oil", "Pain Nabhi Oil", "Circulation Nabhi Oil"],
      ["Warm Relax Feet Oil", "Circulation Feet Oil", "Deep Comfort Feet Oil"],
      ["Moringa Powder", "Turmeric Powder", "Ashwagandha Powder"],
    ),
    faqs: [
      {
        question: "Is this only for older adults?",
        answer:
          "It is designed for senior-care routines, but adults wanting a comfort-led ritual may also find it useful.",
      },
      {
        question: "Can caregivers manage the routine easily?",
        answer:
          "Yes. The whole point is to make the ritual simple and repeatable, not technical.",
      },
    ],
    badge: "Senior Care",
    limitedStockText: "Crafted in small batches",
    supportLine: "9-in-1 complete therapy kit for senior wellness support",
    relatedSlugs: ["body-relief-oil", "family-daily-combo"],
  }),
  createKit({
    id: "kit_parivar_swasthya",
    slug: "parivar-swasthya-9-in-1-wellness-kit",
    name: "Parivar Swasthya 9-in-1 Wellness Kit",
    category: "Parivar Swasthya",
    subcategory: "Family Care",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1200&q=80",
    shortBenefit:
      "Family wellness support for immunity, digestion, calmer evenings, and shared daily balance.",
    description:
      "A versatile family-care 9-in-1 therapy system designed for homes that want one premium routine instead of many mismatched products.",
    problemStatement:
      "Built for families managing stress, digestion, low immunity, busy evenings, and the need for a shared wellness rhythm.",
    benefits: [
      "Supports one shared wellness routine for the household",
      "Helps buying decisions feel simpler and more premium",
      "Supports digestion, immunity, and stress balance habits",
      "Makes nightly wellness rituals easier to repeat",
      "Works well as the everyday entry point into the brand",
    ],
    ingredientsFeel: [
      "Balanced nabhi oils with immunity and digestive support positioning",
      "Calming feet oils that suit a wider household routine",
      "Powder trio inspired by amla, giloy, and tulsi support",
    ],
    usageMethod: [
      "Rotate the kit based on the need of the day",
      "Use the feet ritual to make evenings feel more grounded",
      "Take the daily powder portion with warm water or herbal drinks",
    ],
    whoShouldUse: [
      "Families wanting a shared, premium wellness routine",
      "First-time buyers entering the brand through a versatile kit",
      "Customers looking for immunity and digestion support in one system",
    ],
    expectedTimeline: [
      "Week 1: family routine feels easier to follow",
      "Week 2: supports better consistency and calmer evenings",
      "Weeks 3-6: the system feels like part of the home rhythm",
    ],
    whatsInside: createTherapyItems(
      ["Immunity Nabhi Oil", "Digestive Nabhi Oil", "Stress Nabhi Oil"],
      ["Relax Feet Oil", "Comfort Feet Oil", "Cooling Feet Oil"],
      ["Amla Powder", "Giloy Powder", "Tulsi Powder"],
    ),
    faqs: [
      {
        question: "Which kit should a first-time buyer choose?",
        answer:
          "Parivar Swasthya is a strong entry point because it covers broad daily balance needs without feeling too narrow.",
      },
      {
        question: "Can multiple family members use one kit?",
        answer:
          "The kit is designed around family care, but usage should still stay measured and guided according to need.",
      },
    ],
    badge: "Family Pick",
    limitedStockText: "High reorder rate this week",
    supportLine: "9-in-1 complete therapy kit for shared home wellness",
    relatedSlugs: ["family-daily-combo", "giloy-immunity-powder"],
  }),
  createKit({
    id: "kit_ayur_therapy",
    slug: "ayur-therapy-premium-immunity-kit",
    name: "Ayur Therapy Premium Immunity Kit",
    category: "Ayur Therapy",
    subcategory: "Premium Kits",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
    shortBenefit:
      "Premium immunity-focused system for resilience, digestion, calmer evenings, and whole-body balance.",
    description:
      "A premium-positioned 9-in-1 immunity-support kit that feels elevated in both composition and routine design, made for customers wanting a flagship system.",
    problemStatement:
      "Designed for customers seeking a more complete premium wellness ritual around immunity support, stress recovery, and daily resilience.",
    benefits: [
      "Supports a premium-feeling daily resilience ritual",
      "Helps immunity-focused buying feel more complete",
      "Supports the body through a multi-step routine instead of a single product",
      "Feels giftable and flagship-led in presentation",
      "Works well for customers choosing the brand’s most elevated system",
    ],
    ingredientsFeel: [
      "Elevated nabhi oils positioned around immunity and internal balance",
      "Restorative feet oils for deeper evening calm",
      "Powders inspired by giloy, tulsi, and amla for routine resilience support",
    ],
    usageMethod: [
      "Use the suggested nabhi oil before rest",
      "Layer the feet ritual for a grounded finish",
      "Continue the powder rhythm daily for best consistency",
    ],
    whoShouldUse: [
      "Customers wanting the most premium system in the range",
      "Buyers focusing on resilience and whole-body support",
      "Gift buyers looking for a flagship Ayurvedic kit",
    ],
    expectedTimeline: [
      "Week 1: the ritual feels premium and complete",
      "Week 2: supports a stronger bedtime and morning rhythm",
      "Weeks 3-6: helps the system feel like a core daily habit",
    ],
    whatsInside: createTherapyItems(
      ["Resilience Nabhi Oil", "Digestive Balance Nabhi Oil", "Calm Focus Nabhi Oil"],
      ["Deep Restore Feet Oil", "Circulation Feet Oil", "Night Ease Feet Oil"],
      ["Giloy Powder", "Tulsi Powder", "Amla Powder"],
    ),
    faqs: [
      {
        question: "What makes this the premium kit?",
        answer:
          "Its positioning, composition, and gifting value are all designed to make it feel like the flagship wellness system in the range.",
      },
      {
        question: "Is this suitable for first-time buyers?",
        answer:
          "Yes, especially if the buyer wants one premium decision with clear structure from day one.",
      },
    ],
    badge: "Premium",
    limitedStockText: "Limited premium batch",
    supportLine: "9-in-1 complete therapy kit with premium immunity focus",
    relatedSlugs: ["immunity-support-combo", "tulsi-dry-leaf"],
  }),
];

export const featuredKitSlugs = [
  "purush-shakti-9-in-1-wellness-kit",
  "stree-arogya-9-in-1-wellness-kit",
  "ayur-therapy-premium-immunity-kit",
  "parivar-swasthya-9-in-1-wellness-kit",
];
