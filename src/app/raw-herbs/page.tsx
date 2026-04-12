import type { Metadata } from "next";
import { CollectionPage } from "@/components/brand/collection-page";
import { BRAND } from "@/lib/brand";
import { getCollectionContent, getProductsByType } from "@/lib/data";

const content = getCollectionContent("raw-herbs");

export const metadata: Metadata = {
  title: `Raw Herbs | ${BRAND.name}`,
  description:
    "Explore raw Ayurvedic herbs across roots, leaves, fruits, seeds, bark, and flowers in a premium ingredient-led storefront.",
};

export default function RawHerbsPage() {
  if (!content) {
    return null;
  }

  return <CollectionPage content={content} products={getProductsByType("raw-herb")} />;
}
