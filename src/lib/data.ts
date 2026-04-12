import type { Product, ProductType } from "@/types";
import { collectionPages, getCollectionContent } from "@/lib/storefront/collections";
import {
  collectionQuickLinks,
  howItWorks,
  lifestyleProblems,
  testimonials,
  topCategories,
  whyChooseUs,
} from "@/lib/storefront/content";
import { combos, comboHighlightSlugs } from "@/lib/storefront/combos";
import { herbalOils } from "@/lib/storefront/oils";
import { herbalPowders } from "@/lib/storefront/powders";
import { rawHerbs } from "@/lib/storefront/raw-herbs";
import { featuredKitSlugs, wellnessKits } from "@/lib/storefront/wellness-kits";

export {
  collectionPages,
  collectionQuickLinks,
  comboHighlightSlugs,
  featuredKitSlugs,
  getCollectionContent,
  howItWorks,
  lifestyleProblems,
  testimonials,
  topCategories,
  whyChooseUs,
};

export const products: Product[] = [
  ...wellnessKits,
  ...herbalPowders,
  ...herbalOils,
  ...rawHerbs,
  ...combos,
];

export const sampleOrders = [
  {
    id: "sample-order-1",
    orderNumber: "ADS-2001",
    customerName: "Karan Mehta",
    phone: "9876543210",
    address: "Bopal, Ahmedabad",
    totalPrice: 2499,
    status: "pending" as const,
    createdAt: "2026-04-11T08:30:00.000Z",
    items: [
      {
        productId: "kit_purush_shakti",
        productName: "Purush Shakti 9-in-1 Wellness Kit",
        quantity: 1,
        unitPrice: 2499,
      },
    ],
  },
  {
    id: "sample-order-2",
    orderNumber: "ADS-2002",
    customerName: "Priya Shah",
    phone: "9811112233",
    address: "Baner, Pune",
    totalPrice: 899,
    status: "shipped" as const,
    createdAt: "2026-04-10T11:10:00.000Z",
    items: [
      {
        productId: "combo_family",
        productName: "Family Daily Combo",
        quantity: 1,
        unitPrice: 899,
      },
    ],
  },
  {
    id: "sample-order-3",
    orderNumber: "ADS-2003",
    customerName: "Aarti Verma",
    phone: "9899900011",
    address: "Malviya Nagar, Jaipur",
    totalPrice: 2499,
    status: "delivered" as const,
    createdAt: "2026-04-09T18:00:00.000Z",
    items: [
      {
        productId: "kit_stree_arogya",
        productName: "Stree Arogya 9-in-1 Wellness Kit",
        quantity: 1,
        unitPrice: 2499,
      },
    ],
  },
];

export function getProductsByType(type: ProductType) {
  return products.filter((product) => product.type === type);
}

export function getProductsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean) as Product[];
}
