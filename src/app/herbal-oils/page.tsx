import type { Metadata } from "next";
import { CollectionPage } from "@/components/brand/collection-page";
import { BRAND } from "@/lib/brand";
import { getCollectionContent, getProductsByType } from "@/lib/data";

const content = getCollectionContent("herbal-oils");

export const metadata: Metadata = {
  title: `Herbal Oils | ${BRAND.name}`,
  description:
    "Explore nabhi oils, feet oils, nasal oils, hair oils, and body oils built to support ritual-led Ayurvedic wellness.",
};

export default function HerbalOilsPage() {
  if (!content) {
    return null;
  }

  return <CollectionPage content={content} products={getProductsByType("herbal-oil")} />;
}
