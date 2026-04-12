export const BRAND = {
  name: "AYURDHARA DIVYA SHAKTI",
  title: "Premium Ayurvedic Wellness System",
  tagline: "Complete 9-in-1 Ayurvedic Wellness System",
  subtext:
    "Nabhi + Feet + Herbal Powder Therapy designed to support total body balance through a simple daily ritual.",
  positioning: "Premium Ayurvedic Wellness System",
  coreConcept: "Nabhi Oil + Feet Oil + Herbal Powder Therapy System",
  whatsappNumber: "919876543210",
  whatsappOrderMessage:
    "Hi, I want to order Ayurdhara Divya Shakti wellness kit",
  supportPhone: "+91 98765 43210",
  supportEmail: "care@ayurdharadivyashakti.com",
  offerPrice: 2499,
  originalPrice: 2699,
  savings: 200,
  flagshipLabel: "9-in-1 Complete Therapy Kit",
  treatmentComparisonLabel: "Ayurvedic wellness kit, herbal therapy, nabhi oil",
  treatmentComparisonValue:
    "A premium system-led routine for daily balance, not a one-product quick fix.",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  {
    href: "/wellness-kits",
    label: "Wellness Kits",
    highlight: true,
    badge: "Primary",
  },
  { href: "/herbal-powders", label: "Herbal Powders" },
  { href: "/herbal-oils", label: "Herbal Oils" },
  { href: "/raw-herbs", label: "Raw Herbs" },
  { href: "/combos", label: "Combos" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;
