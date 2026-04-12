import type { Product, ProductItem } from "@/types";
import { BRAND } from "@/lib/brand";

export function createTherapyItems(
  nabhiOils: string[],
  feetOils: string[],
  powders: string[],
): ProductItem[] {
  return [
    ...nabhiOils.map((name) => ({
      name,
      purpose: "Supports a focused nightly nabhi application ritual.",
      format: "15ml",
      group: "Nabhi Oils",
    })),
    ...feetOils.map((name) => ({
      name,
      purpose: "Supports a calming feet massage before rest.",
      format: "30ml",
      group: "Feet Oils",
    })),
    ...powders.map((name) => ({
      name,
      purpose: "Supports the daily inner wellness routine.",
      format: "50-100g",
      group: "Herbal Powders",
    })),
  ];
}

export function createKit(
  input: Omit<
    Product,
    "type" | "therapyLabel" | "saveAmount" | "price" | "originalPrice" | "durationLabel"
  >,
): Product {
  return {
    ...input,
    type: "wellness-kit",
    therapyLabel: BRAND.flagshipLabel,
    price: BRAND.offerPrice,
    originalPrice: BRAND.originalPrice,
    saveAmount: BRAND.savings,
    durationLabel: "30-45 day guided wellness routine",
  };
}

export function createRetailProduct(
  input: Omit<Product, "therapyLabel" | "saveAmount" | "durationLabel">,
): Product {
  return {
    ...input,
    therapyLabel:
      input.type === "combo"
        ? "Bundle wellness ritual"
        : input.type === "raw-herb"
          ? "Single-origin herbal ingredient"
          : "Supportive everyday wellness product",
    saveAmount: Math.max(input.originalPrice - input.price, 0),
    durationLabel:
      input.type === "combo"
        ? "Built for 20-30 day routine support"
        : "Easy daily wellness support",
  };
}
