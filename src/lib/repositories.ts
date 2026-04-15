import "server-only";

import { products, sampleOrders } from "@/lib/data";
import {
  changePreviewOrderStatus,
  createPreviewOrder,
  getPreviewProductBySlug,
  listPreviewOrders,
  listPreviewProducts,
  removePreviewProduct,
  upsertPreviewProduct,
} from "@/lib/local-preview-store";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import type {
  CheckoutPayload,
  DashboardStats,
  OrderRecord,
  OrderStatus,
  Product,
} from "@/types";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  short_benefit: string;
  description: string;
  type?: Product["type"];
  category: Product["category"];
  subcategory?: string | null;
  image: string;
  problem_statement: string;
  benefits: string[];
  ingredients_feel: string[];
  usage_method: string[];
  who_should_use: string[];
  expected_timeline: string[];
  whats_inside: Product["whatsInside"];
  faqs: Product["faqs"];
  price: number;
  original_price: number;
  duration_label: string;
  badge?: string | null;
  limited_stock_text?: string | null;
  therapy_label?: string | null;
  support_line?: string | null;
  related_slugs?: string[] | null;
  seo_title?: string | null;
  seo_description?: string | null;
};

type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  email?: string | null;
  phone: string;
  address: string;
  user_id?: string | null;
  total_price: number;
  status: OrderStatus;
  created_at: string;
  order_items?: {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
  }[];
};

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortBenefit: row.short_benefit,
    description: row.description,
    type: row.type ?? "wellness-kit",
    category: row.category,
    subcategory: row.subcategory ?? undefined,
    image: row.image,
    problemStatement: row.problem_statement,
    benefits: row.benefits,
    ingredientsFeel: row.ingredients_feel,
    usageMethod: row.usage_method,
    whoShouldUse: row.who_should_use,
    expectedTimeline: row.expected_timeline,
    whatsInside: row.whats_inside,
    faqs: row.faqs,
    price: row.price,
    originalPrice: row.original_price,
    durationLabel: row.duration_label,
    badge: row.badge ?? undefined,
    limitedStockText: row.limited_stock_text ?? undefined,
    therapyLabel: row.therapy_label ?? undefined,
    supportLine: row.support_line ?? undefined,
    relatedSlugs: row.related_slugs ?? undefined,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    saveAmount: Math.max(row.original_price - row.price, 0),
  };
}

function mapOrderRow(row: OrderRow): OrderRecord {
  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    email: row.email ?? undefined,
    phone: row.phone,
    address: row.address,
    userId: row.user_id ?? undefined,
    totalPrice: row.total_price,
    status: row.status,
    createdAt: row.created_at,
    items:
      row.order_items?.map((item) => ({
        productId: item.product_id,
        productName: item.product_name,
        quantity: item.quantity,
        unitPrice: item.unit_price,
      })) ?? [],
  };
}

function requireDatabase() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured yet. Add your environment variables to enable live catalog and order storage.",
    );
  }

  const client = getSupabaseAdmin();
  if (!client) {
    throw new Error("Supabase service client is unavailable.");
  }

  return client;
}

export async function listProducts() {
  const client = getSupabaseAdmin();

  if (!client) {
    return listPreviewProducts();
  }

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error || !data?.length) {
    return products;
  }

  return (data as ProductRow[]).map(mapProductRow);
}

export async function getProductBySlug(slug: string) {
  const client = getSupabaseAdmin();

  if (!client) {
    return getPreviewProductBySlug(slug);
  }

  const { data } = await client.from("products").select("*").eq("slug", slug).maybeSingle();
  return data ? mapProductRow(data as ProductRow) : getPreviewProductBySlug(slug);
}

export async function listOrders() {
  const client = getSupabaseAdmin();

  if (!client) {
    return listPreviewOrders();
  }

  const { data, error } = await client
    .from("orders")
    .select("id, order_number, customer_name, email, phone, address, user_id, total_price, status, created_at, order_items(product_id, product_name, quantity, unit_price)")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return sampleOrders;
  }

  return (data as OrderRow[]).map(mapOrderRow);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const orders = await listOrders();
  return {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalPrice, 0),
    pendingOrders: orders.filter((order) => order.status === "pending").length,
  };
}

export async function createOrder(payload: CheckoutPayload) {
  if (!isSupabaseConfigured()) {
    return createPreviewOrder(payload);
  }

  const client = requireDatabase();
  const orderNumber = `ADS-${Date.now().toString().slice(-6)}`;
  const totalPrice = payload.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );

  const { data: order, error: orderError } = await client
    .from("orders")
    .insert({
      customer_name: payload.customerName,
      email: payload.email ?? null,
      phone: payload.phone,
      address: payload.address,
      user_id: payload.userId ?? null,
      total_price: totalPrice,
      status: "pending",
      order_number: orderNumber,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order) {
    throw new Error(orderError?.message ?? "Unable to create the order.");
  }

  const { error: itemsError } = await client.from("order_items").insert(
    payload.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      unit_price: item.unitPrice,
    })),
  );

  if (itemsError) {
    throw new Error(itemsError.message);
  }

  return {
    id: order.id as string,
    orderNumber: order.order_number as string,
  };
}

export async function upsertProduct(input: Partial<Product> & { name: string }) {
  if (!isSupabaseConfigured()) {
    upsertPreviewProduct({
      ...input,
      id: input.id ?? crypto.randomUUID(),
      slug: input.slug ?? slugify(input.name),
    });
    return;
  }

  const client = requireDatabase();
  const id = input.id ?? crypto.randomUUID();
  const slug = input.slug ?? slugify(input.name);

  const payload = {
    id,
    slug,
    name: input.name,
    short_benefit: input.shortBenefit ?? "",
    description: input.description ?? "",
    type: input.type ?? "wellness-kit",
    category: input.category ?? "Parivar Swasthya",
    subcategory: input.subcategory ?? null,
    image: input.image ?? "",
    problem_statement: input.problemStatement ?? "",
    benefits: input.benefits ?? [],
    ingredients_feel: input.ingredientsFeel ?? [],
    usage_method: input.usageMethod ?? [],
    who_should_use: input.whoShouldUse ?? [],
    expected_timeline: input.expectedTimeline ?? [],
    whats_inside: input.whatsInside ?? [],
    faqs: input.faqs ?? [],
    price: input.price ?? 2499,
    original_price: input.originalPrice ?? 2699,
    duration_label: input.durationLabel ?? "30-45 day guided wellness routine",
    badge: input.badge ?? null,
    limited_stock_text: input.limitedStockText ?? null,
    therapy_label: input.therapyLabel ?? null,
    support_line: input.supportLine ?? null,
    related_slugs: input.relatedSlugs ?? [],
    seo_title: input.seoTitle ?? null,
    seo_description: input.seoDescription ?? null,
    is_active: true,
  };

  const { error } = await client.from("products").upsert(payload);
  if (error) {
    throw new Error(error.message);
  }
}

export async function removeProduct(id: string) {
  if (!isSupabaseConfigured()) {
    removePreviewProduct(id);
    return;
  }

  const client = requireDatabase();
  const { error } = await client.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

export async function changeOrderStatus(id: string, status: OrderStatus) {
  if (!isSupabaseConfigured()) {
    changePreviewOrderStatus(id, status);
    return;
  }

  const client = requireDatabase();
  const { error } = await client.from("orders").update({ status }).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}
