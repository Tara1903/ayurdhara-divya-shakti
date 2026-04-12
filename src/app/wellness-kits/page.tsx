import type { Metadata } from "next";
import { CollectionPage } from "@/components/brand/collection-page";
import { BRAND } from "@/lib/brand";
import { getCollectionContent, getProductsByType } from "@/lib/data";
import { listProducts } from "@/lib/repositories";

const content = getCollectionContent("wellness-kits");

export const metadata: Metadata = {
  title: `Wellness Kits | ${BRAND.name}`,
  description:
    "Shop the premium 9-in-1 Ayurvedic wellness kits from Ayurdhara Divya Shakti, arranged around men, women, child, senior, family, and premium support rituals.",
};

export default async function WellnessKitsPage() {
  const liveProducts = await listProducts();
  const products = getProductsByType("wellness-kit").filter((product) =>
    liveProducts.find((entry) => entry.slug === product.slug),
  );

  if (!content) {
    return null;
  }

  return <CollectionPage content={content} products={products} />;
}
