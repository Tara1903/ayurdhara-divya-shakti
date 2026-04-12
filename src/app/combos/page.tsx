import type { Metadata } from "next";
import { CollectionPage } from "@/components/brand/collection-page";
import { BRAND } from "@/lib/brand";
import { getCollectionContent, getProductsByType } from "@/lib/data";

const content = getCollectionContent("combos");

export const metadata: Metadata = {
  title: `Combos | ${BRAND.name}`,
  description:
    "Shop Ayurvedic combo offers for hair care, skin balance, immunity support, weight rhythm, and family wellness.",
};

export default function CombosPage() {
  if (!content) {
    return null;
  }

  return <CollectionPage content={content} products={getProductsByType("combo")} />;
}
