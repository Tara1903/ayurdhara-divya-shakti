import "server-only";

import { products, sampleOrders } from "@/lib/data";
import type {
  CheckoutPayload,
  CustomerAddress,
  CustomerProfile,
  OrderRecord,
  OrderStatus,
  Product,
  WishlistItem,
} from "@/types";

type PreviewCustomerAccount = CustomerProfile & {
  password: string;
};

type PreviewOtpChallenge = {
  email: string;
  token: string;
  expiresAt: number;
};

type PreviewStore = {
  products: Product[];
  orders: OrderRecord[];
  customers: PreviewCustomerAccount[];
  addresses: CustomerAddress[];
  wishlist: Array<{ userId: string; productId: string; createdAt: string }>;
  otpChallenges: PreviewOtpChallenge[];
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

function createDefaultCustomer(): PreviewCustomerAccount {
  const now = new Date().toISOString();

  return {
    id: "preview-customer-1",
    fullName: "Preview Customer",
    email: "customer@ayurdhara.local",
    phone: "9876543210",
    password: "preview123",
    createdAt: now,
    updatedAt: now,
  };
}

function createDefaultAddress(customer: PreviewCustomerAccount): CustomerAddress {
  const now = new Date().toISOString();

  return {
    id: "preview-address-1",
    userId: customer.id,
    label: "Home",
    recipientName: customer.fullName,
    phone: customer.phone,
    line1: "12 Wellness Avenue",
    line2: "Near Green Park",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380015",
    country: "India",
    isDefault: true,
    createdAt: now,
    updatedAt: now,
  };
}

function createStore(): PreviewStore {
  const previewOrders = cloneValue(sampleOrders);
  const previewCustomer = createDefaultCustomer();

  return {
    products: cloneValue(products),
    orders: previewOrders,
    customers: [previewCustomer],
    addresses: [createDefaultAddress(previewCustomer)],
    wishlist: [],
    otpChallenges: [],
    nextOrderSequence: getInitialOrderSequence(previewOrders),
  };
}

function getStore() {
  if (!globalThis.__ayurdharaPreviewStore) {
    globalThis.__ayurdharaPreviewStore = createStore();
  }

  return globalThis.__ayurdharaPreviewStore;
}

function mapAddressInput(
  userId: string,
  input: Partial<CustomerAddress> & {
    recipientName: string;
    phone: string;
    line1: string;
    city: string;
    state: string;
    pincode: string;
  },
  existing?: CustomerAddress,
) {
  const now = new Date().toISOString();

  return {
    id: input.id ?? existing?.id ?? crypto.randomUUID(),
    userId,
    label: input.label?.trim() || existing?.label || "Address",
    recipientName: input.recipientName.trim(),
    phone: input.phone.trim(),
    line1: input.line1.trim(),
    line2: input.line2?.trim() || "",
    city: input.city.trim(),
    state: input.state.trim(),
    pincode: input.pincode.trim(),
    country: input.country?.trim() || existing?.country || "India",
    isDefault: input.isDefault ?? existing?.isDefault ?? false,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  } satisfies CustomerAddress;
}

function ensureSingleDefaultAddress(userId: string, addressId: string) {
  const store = getStore();
  store.addresses = store.addresses.map((address) =>
    address.userId === userId
      ? {
          ...address,
          isDefault: address.id === addressId,
        }
      : address,
  );
}

function attachWishlistProducts(items: Array<{ userId: string; productId: string; createdAt: string }>) {
  const store = getStore();

  return items
    .map((item) => {
      const product = store.products.find((entry) => entry.id === item.productId);
      return product
        ? {
            userId: item.userId,
            productId: item.productId,
            createdAt: item.createdAt,
            product: cloneValue(product),
          }
        : null;
    })
    .filter(Boolean) as WishlistItem[];
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

export function listPreviewOrdersByUser(userId: string) {
  return cloneValue(getStore().orders.filter((order) => order.userId === userId));
}

export function createPreviewOrder(payload: CheckoutPayload) {
  const store = getStore();
  const orderNumber = `ADS-${String(store.nextOrderSequence).padStart(4, "0")}`;
  const order: OrderRecord = {
    id: crypto.randomUUID(),
    orderNumber,
    customerName: payload.customerName,
    email: payload.email,
    phone: payload.phone,
    address: payload.address,
    userId: payload.userId,
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

export function getPreviewCustomerById(id: string) {
  const customer = getStore().customers.find((entry) => entry.id === id) ?? null;
  return customer ? cloneValue(customer) : null;
}

export function getPreviewCustomerByEmail(email: string) {
  const customer =
    getStore().customers.find((entry) => entry.email.toLowerCase() === email.toLowerCase()) ?? null;
  return customer ? cloneValue(customer) : null;
}

export function createPreviewCustomer(input: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const existing = getPreviewCustomerByEmail(input.email);
  if (existing) {
    throw new Error("An account already exists with this email.");
  }

  const now = new Date().toISOString();
  const customer: PreviewCustomerAccount = {
    id: crypto.randomUUID(),
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    password: input.password,
    createdAt: now,
    updatedAt: now,
  };

  const store = getStore();
  store.customers = [customer, ...store.customers];
  store.addresses = [
    {
      id: crypto.randomUUID(),
      userId: customer.id,
      label: "Home",
      recipientName: customer.fullName,
      phone: customer.phone,
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      isDefault: true,
      createdAt: now,
      updatedAt: now,
    },
    ...store.addresses,
  ];

  return cloneValue(customer);
}

export function validatePreviewCustomerPassword(email: string, password: string) {
  const customer = getStore().customers.find(
    (entry) => entry.email.toLowerCase() === email.toLowerCase(),
  );

  if (!customer || customer.password !== password) {
    return null;
  }

  return cloneValue(customer);
}

export function updatePreviewCustomerProfile(
  userId: string,
  input: Partial<Pick<CustomerProfile, "fullName" | "phone">>,
) {
  const store = getStore();
  const customer = store.customers.find((entry) => entry.id === userId);

  if (!customer) {
    throw new Error("Preview customer not found.");
  }

  customer.fullName = input.fullName?.trim() || customer.fullName;
  customer.phone = input.phone?.trim() || customer.phone;
  customer.updatedAt = new Date().toISOString();

  store.addresses = store.addresses.map((address) =>
    address.userId === userId && address.isDefault
      ? {
          ...address,
          recipientName: customer.fullName,
          phone: customer.phone,
          updatedAt: customer.updatedAt,
        }
      : address,
  );

  return cloneValue(customer);
}

export function listPreviewCustomerAddresses(userId: string) {
  return cloneValue(getStore().addresses.filter((entry) => entry.userId === userId));
}

export function savePreviewCustomerAddress(
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
  const store = getStore();
  const existing = input.id
    ? store.addresses.find((entry) => entry.id === input.id && entry.userId === userId)
    : undefined;
  const nextAddress = mapAddressInput(userId, input, existing);

  if (existing) {
    store.addresses = store.addresses.map((entry) =>
      entry.id === existing.id ? nextAddress : entry,
    );
  } else {
    store.addresses = [nextAddress, ...store.addresses];
  }

  if (nextAddress.isDefault || !store.addresses.some((entry) => entry.userId === userId && entry.isDefault)) {
    ensureSingleDefaultAddress(userId, nextAddress.id);
  }

  return cloneValue(
    getStore().addresses.find((entry) => entry.id === nextAddress.id)!,
  );
}

export function deletePreviewCustomerAddress(userId: string, addressId: string) {
  const store = getStore();
  const target = store.addresses.find((entry) => entry.id === addressId && entry.userId === userId);

  if (!target) {
    return;
  }

  store.addresses = store.addresses.filter((entry) => entry.id !== addressId);

  if (target.isDefault) {
    const fallback = store.addresses.find((entry) => entry.userId === userId);
    if (fallback) {
      ensureSingleDefaultAddress(userId, fallback.id);
    }
  }
}

export function listPreviewWishlist(userId: string) {
  return attachWishlistProducts(getStore().wishlist.filter((entry) => entry.userId === userId));
}

export function togglePreviewWishlist(userId: string, productId: string) {
  const store = getStore();
  const existing = store.wishlist.find(
    (entry) => entry.userId === userId && entry.productId === productId,
  );

  if (existing) {
    store.wishlist = store.wishlist.filter(
      (entry) => !(entry.userId === userId && entry.productId === productId),
    );
    return false;
  }

  store.wishlist = [
    {
      userId,
      productId,
      createdAt: new Date().toISOString(),
    },
    ...store.wishlist,
  ];

  return true;
}

export function isPreviewWishlistItem(userId: string, productId: string) {
  return getStore().wishlist.some(
    (entry) => entry.userId === userId && entry.productId === productId,
  );
}

export function createPreviewOtpChallenge(email: string) {
  const store = getStore();
  const token = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 10 * 60 * 1000;

  store.otpChallenges = [
    {
      email: email.toLowerCase(),
      token,
      expiresAt,
    },
    ...store.otpChallenges.filter((entry) => entry.email !== email.toLowerCase()),
  ];

  return token;
}

export function verifyPreviewOtpChallenge(email: string, token: string) {
  const normalizedEmail = email.toLowerCase();
  const store = getStore();
  const challenge = store.otpChallenges.find((entry) => entry.email === normalizedEmail);

  if (!challenge) {
    throw new Error("No OTP request was found for this email.");
  }

  if (challenge.expiresAt < Date.now()) {
    store.otpChallenges = store.otpChallenges.filter((entry) => entry.email !== normalizedEmail);
    throw new Error("This OTP has expired. Please request a fresh code.");
  }

  if (challenge.token !== token.trim()) {
    throw new Error("That OTP code is not valid.");
  }

  store.otpChallenges = store.otpChallenges.filter((entry) => entry.email !== normalizedEmail);

  const customer = getStore().customers.find((entry) => entry.email === normalizedEmail);
  if (!customer) {
    throw new Error("No customer account exists for this email yet.");
  }

  return cloneValue(customer);
}
