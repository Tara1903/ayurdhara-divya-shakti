import type { Metadata } from "next";
import { CollectionPage } from "@/components/brand/collection-page";
import { BRAND } from "@/lib/brand";
import { getCollectionContent, getProductsByType } from "@/lib/data";

const content = getCollectionContent("herbal-powders");

export const metadata: Metadata = {
  title: `Herbal Powders | ${BRAND.name}`,
  description:
    "Explore herbal powders for immunity, hair care, skin balance, digestion, and energy support in the Ayurdhara Divya Shakti range.",
};

export default function HerbalPowdersPage() {
  if (!content) {
    return null;
  }

  return <CollectionPage content={content} products={getProductsByType("herbal-powder")} />;
}
