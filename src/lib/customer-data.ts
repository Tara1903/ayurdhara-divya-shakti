import "server-only";

import { getSupabaseAdmin, isSupabaseAuthConfigured } from "@/lib/supabase";
import {
  createPreviewCustomer,
  createPreviewOtpChallenge,
  deletePreviewCustomerAddress,
  getPreviewCustomerByEmail,
  getPreviewCustomerById,
  isPreviewWishlistItem,
  listPreviewCustomerAddresses,
  listPreviewOrdersByUser,
  listPreviewWishlist,
  savePreviewCustomerAddress,
  togglePreviewWishlist,
  updatePreviewCustomerProfile,
  validatePreviewCustomerPassword,
  verifyPreviewOtpChallenge,
} from "@/lib/local-preview-store";
import type {
  CustomerAddress,
  CustomerProfile,
  OrderRecord,
  WishlistItem,
} from "@/types";

type CustomerProfileRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

type CustomerAddressRow = {
  id: string;
  user_id: string;
  label: string;
  recipient_name: string;
  phone: string;
  line_1: string;
  line_2: string | null;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

type WishlistRow = {
  user_id: string;
  product_id: string;
  created_at: string;
  products:
    | {
    id: string;
    slug: string;
    name: string;
    short_benefit: string;
    description: string;
    type?: WishlistItem["product"]["type"];
    category: string;
    subcategory?: string | null;
    image: string;
    problem_statement: string;
    benefits: string[];
    ingredients_feel: string[];
    usage_method: string[];
    who_should_use: string[];
    expected_timeline: string[];
    whats_inside: WishlistItem["product"]["whatsInside"];
    faqs: WishlistItem["product"]["faqs"];
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
    }
    | {
      id: string;
      slug: string;
      name: string;
      short_benefit: string;
      description: string;
      type?: WishlistItem["product"]["type"];
      category: string;
      subcategory?: string | null;
      image: string;
      problem_statement: string;
      benefits: string[];
      ingredients_feel: string[];
      usage_method: string[];
      who_should_use: string[];
      expected_timeline: string[];
      whats_inside: WishlistItem["product"]["whatsInside"];
      faqs: WishlistItem["product"]["faqs"];
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
    }[]
    | null;
};

type CustomerOrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  email: string | null;
  phone: string;
  address: string;
  user_id: string | null;
  total_price: number;
  status: OrderRecord["status"];
  created_at: string;
  order_items?: {
    product_id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
  }[];
};

function isPreviewModeAvailable() {
  return process.env.NODE_ENV !== "production" && !isSupabaseAuthConfigured();
}

function mapCustomerProfileRow(row: CustomerProfileRow): CustomerProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapCustomerAddressRow(row: CustomerAddressRow): CustomerAddress {
  return {
    id: row.id,
    userId: row.user_id,
    label: row.label,
    recipientName: row.recipient_name,
    phone: row.phone,
    line1: row.line_1,
    line2: row.line_2 ?? "",
    city: row.city,
    state: row.state,
    pincode: row.pincode,
    country: row.country,
    isDefault: row.is_default,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapOrderRow(row: CustomerOrderRow): OrderRecord {
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

function mapWishlistRows(rows: WishlistRow[]): WishlistItem[] {
  return rows
    .map((row) => {
      const product = Array.isArray(row.products) ? row.products[0] : row.products;

      if (!product) {
        return null;
      }

      return {
        userId: row.user_id,
        productId: row.product_id,
        createdAt: row.created_at,
        product: {
          id: product.id,
          slug: product.slug,
          name: product.name,
          shortBenefit: product.short_benefit,
          description: product.description,
          type: product.type ?? "wellness-kit",
          category: product.category,
          subcategory: product.subcategory ?? undefined,
          image: product.image,
          problemStatement: product.problem_statement,
          benefits: product.benefits,
          ingredientsFeel: product.ingredients_feel,
          usageMethod: product.usage_method,
          whoShouldUse: product.who_should_use,
          expectedTimeline: product.expected_timeline,
          whatsInside: product.whats_inside,
          faqs: product.faqs,
          price: product.price,
          originalPrice: product.original_price,
          durationLabel: product.duration_label,
          badge: product.badge ?? undefined,
          limitedStockText: product.limited_stock_text ?? undefined,
          therapyLabel: product.therapy_label ?? undefined,
          supportLine: product.support_line ?? undefined,
          relatedSlugs: product.related_slugs ?? undefined,
          seoTitle: product.seo_title ?? undefined,
          seoDescription: product.seo_description ?? undefined,
          saveAmount: Math.max(product.original_price - product.price, 0),
        },
      } satisfies WishlistItem;
    })
    .filter(Boolean) as WishlistItem[];
}

export async function syncCustomerProfileFromAuth(input: {
  id: string;
  email?: string | null;
  fullName?: string | null;
  phone?: string | null;
}) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    if (isPreviewModeAvailable()) {
      return getPreviewCustomerById(input.id);
    }

    return null;
  }

  const payload = {
    id: input.id,
    email: input.email?.trim().toLowerCase() ?? "",
    full_name: input.fullName?.trim() ?? "",
    phone: input.phone?.trim() ?? "",
  };

  const { error } = await admin.from("customer_profiles").upsert(payload);
  if (error) {
    throw new Error(error.message);
  }

  return getCustomerProfileById(input.id);
}

export async function getCustomerProfileById(userId: string) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return isPreviewModeAvailable() ? getPreviewCustomerById(userId) : null;
  }

  const { data, error } = await admin
    .from("customer_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapCustomerProfileRow(data as CustomerProfileRow);
}

export async function getCustomerProfileByEmail(email: string) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return isPreviewModeAvailable() ? getPreviewCustomerByEmail(email) : null;
  }

  const { data, error } = await admin
    .from("customer_profiles")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapCustomerProfileRow(data as CustomerProfileRow);
}

export async function updateCustomerProfile(
  userId: string,
  input: Pick<CustomerProfile, "fullName" | "phone">,
) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    if (isPreviewModeAvailable()) {
      return updatePreviewCustomerProfile(userId, input);
    }

    throw new Error("Customer profiles are not fully configured in production yet.");
  }

  const { error } = await admin
    .from("customer_profiles")
    .update({
      full_name: input.fullName.trim(),
      phone: input.phone.trim(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return getCustomerProfileById(userId);
}

export async function listCustomerAddresses(userId: string) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return isPreviewModeAvailable() ? listPreviewCustomerAddresses(userId) : [];
  }

  const { data, error } = await admin
    .from("customer_addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as CustomerAddressRow[]).map(mapCustomerAddressRow);
}

export async function upsertCustomerAddress(
  userId: string,
  input: Partial<CustomerAddress> & {
    recipientName: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    pincode: string;
  },
) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    if (isPreviewModeAvailable()) {
      return savePreviewCustomerAddress(userId, input);
    }

    throw new Error("Saved addresses are not fully configured in production yet.");
  }

  const payload = {
    id: input.id ?? crypto.randomUUID(),
    user_id: userId,
    label: input.label?.trim() || "Address",
    recipient_name: input.recipientName.trim(),
    phone: input.phone.trim(),
    line_1: input.line1.trim(),
    line_2: input.line2?.trim() || "",
    city: input.city.trim(),
    state: input.state.trim(),
    pincode: input.pincode.trim(),
    country: input.country?.trim() || "India",
    is_default: input.isDefault ?? false,
  };

  const { error } = await admin.from("customer_addresses").upsert(payload);
  if (error) {
    throw new Error(error.message);
  }

  if (payload.is_default) {
    const { error: defaultError } = await admin
      .from("customer_addresses")
      .update({ is_default: false })
      .eq("user_id", userId)
      .neq("id", payload.id);

    if (defaultError) {
      throw new Error(defaultError.message);
    }
  }

  const { data } = await admin
    .from("customer_addresses")
    .select("*")
    .eq("id", payload.id)
    .maybeSingle();

  return data ? mapCustomerAddressRow(data as CustomerAddressRow) : null;
}

export async function deleteCustomerAddress(userId: string, addressId: string) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    if (isPreviewModeAvailable()) {
      deletePreviewCustomerAddress(userId, addressId);
      return;
    }

    throw new Error("Saved addresses are not fully configured in production yet.");
  }

  const { error } = await admin
    .from("customer_addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function listCustomerWishlist(userId: string) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return isPreviewModeAvailable() ? listPreviewWishlist(userId) : [];
  }

  const { data, error } = await admin
    .from("wishlist_items")
    .select("user_id, product_id, created_at, products(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return mapWishlistRows(data as WishlistRow[]);
}

export async function toggleCustomerWishlist(userId: string, productId: string) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    if (isPreviewModeAvailable()) {
      return togglePreviewWishlist(userId, productId);
    }

    throw new Error("Wishlist storage is not fully configured in production yet.");
  }

  const { data: existing } = await admin
    .from("wishlist_items")
    .select("product_id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing) {
    const { error } = await admin
      .from("wishlist_items")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) {
      throw new Error(error.message);
    }

    return false;
  }

  const { error } = await admin.from("wishlist_items").insert({
    user_id: userId,
    product_id: productId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function hasCustomerWishlistItem(userId: string, productId: string) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return isPreviewModeAvailable() ? isPreviewWishlistItem(userId, productId) : false;
  }

  const { data } = await admin
    .from("wishlist_items")
    .select("product_id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  return Boolean(data);
}

export async function listCustomerOrders(userId: string) {
  const admin = getSupabaseAdmin();

  if (!admin) {
    return isPreviewModeAvailable() ? listPreviewOrdersByUser(userId) : [];
  }

  const { data, error } = await admin
    .from("orders")
    .select(
      "id, order_number, customer_name, email, phone, address, user_id, total_price, status, created_at, order_items(product_id, product_name, quantity, unit_price)",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as CustomerOrderRow[]).map(mapOrderRow);
}

export async function createCustomerPreviewAccount(input: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) {
  return createPreviewCustomer(input);
}

export async function authenticatePreviewCustomer(email: string, password: string) {
  return validatePreviewCustomerPassword(email, password);
}

export async function sendPreviewOtp(email: string) {
  const customer = getPreviewCustomerByEmail(email);
  if (!customer) {
    throw new Error("No account exists for this email yet.");
  }

  return createPreviewOtpChallenge(email);
}

export async function verifyPreviewOtp(email: string, token: string) {
  return verifyPreviewOtpChallenge(email, token);
}
