import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSetupState, isPreviewAdminAuth } from "@/lib/admin-auth";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: `Admin Login | ${BRAND.name}`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  const configured = getAdminSetupState();
  const previewMode = isPreviewAdminAuth();

  return (
    <section className="page-shell section-space">
      <div className="mx-auto max-w-2xl">
        <AdminLoginForm configured={configured} previewMode={previewMode} />
      </div>
    </section>
  );
}
