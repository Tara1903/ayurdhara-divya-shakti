import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProductEditorForm } from "@/components/admin/product-editor-form";
import { requireAdmin } from "@/lib/admin-auth";
import { BRAND } from "@/lib/brand";
import { listProducts } from "@/lib/repositories";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: `Admin Products | ${BRAND.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await listProducts();

  return (
    <AdminShell
      title="Product Management"
      description="Create, refine, and manage wellness kits, support products, and bundle offers with structured product details in one place."
    >
      <div className="grid gap-6">
        <ProductEditorForm />
        {products.map((product) => (
          <ProductEditorForm key={product.id} product={product} />
        ))}
      </div>
    </AdminShell>
  );
}
