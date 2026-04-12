"use server";

import { revalidatePath } from "next/cache";
import { createAdminSession, clearAdminSession } from "@/lib/admin-auth";
import {
  changeOrderStatus,
  removeProduct,
  upsertProduct,
} from "@/lib/repositories";
import type { OrderStatus, Product } from "@/types";

export type AdminActionState = {
  error?: string;
  success?: string;
};

function parseLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parsePairs(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, purpose] = entry.split("|").map((item) => item.trim());
      return { name, purpose };
    })
    .filter((entry) => entry.name && entry.purpose);
}

function parseFaqs(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [question, answer] = entry.split("|").map((item) => item.trim());
      return { question, answer };
    })
    .filter((entry) => entry.question && entry.answer);
}

export async function loginAdminAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  try {
    await createAdminSession(email, password);
    return { success: "Logged in successfully." };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to login with these credentials.",
    };
  }
}

export async function logoutAdminAction() {
  await clearAdminSession();
}

export async function saveProductAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const payload: Partial<Product> & { name: string } = {
    id: String(formData.get("id") ?? "").trim() || undefined,
    slug: String(formData.get("slug") ?? "").trim() || undefined,
    name: String(formData.get("name") ?? "").trim(),
    shortBenefit: String(formData.get("shortBenefit") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    category: (String(formData.get("category") ?? "") || undefined) as Product["category"],
    image: String(formData.get("image") ?? "").trim(),
    problemStatement: String(formData.get("problemStatement") ?? "").trim(),
    benefits: parseLines(formData.get("benefits")),
    ingredientsFeel: parseLines(formData.get("ingredientsFeel")),
    usageMethod: parseLines(formData.get("usageMethod")),
    whoShouldUse: parseLines(formData.get("whoShouldUse")),
    expectedTimeline: parseLines(formData.get("expectedTimeline")),
    whatsInside: parsePairs(formData.get("whatsInside")),
    faqs: parseFaqs(formData.get("faqs")),
    price: Number(formData.get("price") ?? 2499),
    originalPrice: Number(formData.get("originalPrice") ?? 2699),
    durationLabel:
      String(formData.get("durationLabel") ?? "").trim() ||
      "30-45 day guided wellness routine",
  };

  if (!payload.name) {
    return { error: "Product name is required." };
  }

  try {
    await upsertProduct(payload);
    revalidatePath("/kits");
    revalidatePath("/wellness-kits");
    revalidatePath("/admin");
    revalidatePath("/admin/products");
    return { success: "Product saved successfully." };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to save the product.",
    };
  }
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await removeProduct(id);
  revalidatePath("/kits");
  revalidatePath("/wellness-kits");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
}

export async function updateOrderStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "pending") as OrderStatus;
  if (!id) return;

  await changeOrderStatus(id, status);
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
}
