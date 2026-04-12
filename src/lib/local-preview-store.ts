import "server-only";

import { products, sampleOrders } from "@/lib/data";
import type {
  CheckoutPayload,
  OrderRecord,
  OrderStatus,
  Product,
} from "@/types";

type PreviewStore = {
  products: Product[];
  orders: OrderRecord[];
  nextOrderSequence: number;
};

declare global {
  var __ayurdharaPreviewStore: PreviewStore | undefined;
}

function cloneValue<T>(value: T): T {
  return structuredClone(value);
}

function getInitialOrderSequence(orders: OrderRecord[]) {
  return orders.reduce((max, order) => {
    const numericPortion = Number(order.orderNumber.replace(/\D/g, ""));
    return Number.isFinite(numericPortion) ? Math.max(max, numericPortion + 1) : max;
  }, 1004);
}

function createStore(): PreviewStore {
  const previewOrders = cloneValue(sampleOrders);

  return {
    products: cloneValue(products),
    orders: previewOrders,
    nextOrderSequence: getInitialOrderSequence(previewOrders),
  };
}

function getStore() {
  if (!globalThis.__ayurdharaPreviewStore) {
    globalThis.__ayurdharaPreviewStore = createStore();
  }

  return globalThis.__ayurdharaPreviewStore;
}

export function listPreviewProducts() {
  return cloneValue(getStore().products);
}

export function getPreviewProductBySlug(slug: string) {
  const product = getStore().products.find((entry) => entry.slug === slug) ?? null;
  return product ? cloneValue(product) : null;
}

export function listPreviewOrders() {
  return cloneValue(getStore().orders);
}

export function createPreviewOrder(payload: CheckoutPayload) {
  const store = getStore();
  const orderNumber = `ADS-${String(store.nextOrderSequence).padStart(4, "0")}`;
  const order: OrderRecord = {
    id: crypto.randomUUID(),
    orderNumber,
    customerName: payload.customerName,
    phone: payload.phone,
    address: payload.address,
    totalPrice: payload.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    ),
    status: "pending",
    createdAt: new Date().toISOString(),
    items: cloneValue(payload.items),
  };

  store.nextOrderSequence += 1;
  store.orders = [order, ...store.orders];

  return {
    id: order.id,
    orderNumber: order.orderNumber,
  };
}

export function upsertPreviewProduct(input: Partial<Product> & { name: string }) {
  const store = getStore();
  const index = input.id
    ? store.products.findIndex((product) => product.id === input.id)
    : -1;

  const nextProduct: Product = {
    ...(index >= 0 ? store.products[index] : ({} as Product)),
    id: input.id ?? crypto.randomUUID(),
    slug: input.slug ?? "",
    name: input.name,
    shortBenefit: input.shortBenefit ?? "",
    description: input.description ?? "",
    type: input.type ?? "wellness-kit",
    category: input.category ?? "Parivar Swasthya",
    subcategory: input.subcategory ?? undefined,
    image: input.image ?? "",
    problemStatement: input.problemStatement ?? "",
    benefits: input.benefits ?? [],
    ingredientsFeel: input.ingredientsFeel ?? [],
    usageMethod: input.usageMethod ?? [],
    whoShouldUse: input.whoShouldUse ?? [],
    expectedTimeline: input.expectedTimeline ?? [],
    whatsInside: input.whatsInside ?? [],
    faqs: input.faqs ?? [],
    price: input.price ?? 2499,
    originalPrice: input.originalPrice ?? 2699,
    durationLabel: input.durationLabel ?? "30-45 day guided wellness routine",
    badge: input.badge ?? undefined,
    limitedStockText: input.limitedStockText ?? undefined,
    therapyLabel: input.therapyLabel ?? undefined,
    supportLine: input.supportLine ?? undefined,
    saveAmount:
      input.saveAmount ??
      Math.max((input.originalPrice ?? 2699) - (input.price ?? 2499), 0),
    relatedSlugs: input.relatedSlugs ?? undefined,
    seoTitle: input.seoTitle ?? undefined,
    seoDescription: input.seoDescription ?? undefined,
  };

  if (index >= 0) {
    store.products[index] = nextProduct;
    return;
  }

  store.products = [nextProduct, ...store.products];
}

export function removePreviewProduct(id: string) {
  const store = getStore();
  store.products = store.products.filter((product) => product.id !== id);
}

export function changePreviewOrderStatus(id: string, status: OrderStatus) {
  const store = getStore();
  const target = store.orders.find((order) => order.id === id);

  if (!target) {
    throw new Error("Order not found in local preview store.");
  }

  target.status = status;
}
