"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { products } from "@/lib/data";
import type { CartItem, Product } from "@/types";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  detailedItems: Array<{ product: Product; quantity: number }>;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "ayurdhara-cart-v1";
const STORAGE_EVENT = "ayurdhara-cart-updated";
const CartContext = createContext<CartContextValue | null>(null);
const EMPTY_ITEMS: CartItem[] = [];

let cachedSerializedItems: string | null = null;
let cachedItems: CartItem[] = EMPTY_ITEMS;

function readStoredItems(): CartItem[] {
  if (typeof window === "undefined") {
    return EMPTY_ITEMS;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    cachedSerializedItems = null;
    cachedItems = EMPTY_ITEMS;
    return cachedItems;
  }

  if (stored === cachedSerializedItems) {
    return cachedItems;
  }

  try {
    const parsed = JSON.parse(stored) as Array<
      | CartItem
      | {
          productId: string;
          quantity: number;
        }
    >;

    const nextItems = parsed
      .map((item) => {
        if ("product" in item && item.product) {
          return item as CartItem;
        }

        if (!("productId" in item)) {
          return null;
        }

        const fallbackProduct = products.find(
          (product) => product.id === item.productId,
        );

        return fallbackProduct
          ? {
              product: fallbackProduct,
              quantity: item.quantity,
            }
          : null;
      })
      .filter(Boolean) as CartItem[];

    cachedSerializedItems = stored;
    cachedItems = nextItems.length ? nextItems : EMPTY_ITEMS;
    return cachedItems;
  } catch {
    cachedSerializedItems = null;
    cachedItems = EMPTY_ITEMS;
    return cachedItems;
  }
}

function writeStoredItems(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  const serializedItems = JSON.stringify(items);
  cachedSerializedItems = serializedItems;
  cachedItems = items.length ? items : EMPTY_ITEMS;
  window.localStorage.setItem(STORAGE_KEY, serializedItems);
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function subscribeToCartStore(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => onStoreChange();
  window.addEventListener("storage", handleChange);
  window.addEventListener(STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(STORAGE_EVENT, handleChange);
  };
}

function getServerCartSnapshot() {
  return EMPTY_ITEMS;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeToCartStore,
    readStoredItems,
    getServerCartSnapshot,
  );

  const detailedItems = useMemo(
    () => items.map((item) => ({ product: item.product, quantity: item.quantity })),
    [items],
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = detailedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const value: CartContextValue = {
    items,
    totalItems,
    subtotal,
    detailedItems,
    addItem(product) {
      const current = readStoredItems();
      const nextItems = (() => {
        const existing = current.find((item) => item.product.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }

        return [...current, { product, quantity: 1 }];
      })();

      writeStoredItems(nextItems);
    },
    removeItem(productId) {
      writeStoredItems(
        readStoredItems().filter((item) => item.product.id !== productId),
      );
    },
    updateQuantity(productId, quantity) {
      writeStoredItems(
        readStoredItems()
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    clearCart() {
      writeStoredItems([]);
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
