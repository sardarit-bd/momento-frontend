// store/useCartStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ─── Constants ────────────────────────────────────────────────────────────────

const BASE64_SIZE_LIMIT = 50_000;
const STORAGE_WARN_THRESHOLD = 2 * 1024 * 1024; // 2 MB

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isLargeDataImage = (value) =>
  typeof value === "string" &&
  value.startsWith("data:image/") &&
  value.length > BASE64_SIZE_LIMIT;

/**
 * Recursively strips large base64 strings — used ONLY for persist/storage.
 * Never call this on in-memory state.
 */
const deepStripLargeImages = (value, visited = new WeakSet()) => {
  if (value === null || value === undefined) return value;

  if (typeof value !== "object") {
    return isLargeDataImage(value) ? null : value;
  }

  if (visited.has(value)) return null;
  visited.add(value);

  if (Array.isArray(value)) {
    return value
      .map((item) => deepStripLargeImages(item, visited))
      .filter((item) => item !== null && item !== undefined);
  }

  const result = {};
  for (const [key, val] of Object.entries(value)) {
    const cleaned = deepStripLargeImages(val, visited);
    result[key] = cleaned;
  }
  return result;
};

/**
 * Storage-safe version of a cart item.
 * Strips large base64 images and known binary fields.
 * ONLY used inside partialize — never touches in-memory state.
 */
const sanitizeForStorage = (item) => {
  if (!item || typeof item !== "object") return item;

  const stripped = deepStripLargeImages(item);

  return {
    ...stripped,
    // Always null these — they're binary and never needed from storage
    FinalPDf: null,
    FinalPDFBlob: null,
  };
};

// ─── Safe localStorage wrapper ────────────────────────────────────────────────

const safeLocalStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },

  setItem: (name, value) => {
    if (value?.length > STORAGE_WARN_THRESHOLD) {
      console.warn(
        `[CartStore] Persisted cart is ${(value.length / 1024).toFixed(1)} KB — ` +
          "consider reducing stored data."
      );
    }

    try {
      localStorage.setItem(name, value);
    } catch (error) {
      if (
        error instanceof DOMException &&
        (error.name === "QuotaExceededError" ||
          error.name === "NS_ERROR_DOM_QUOTA_REACHED")
      ) {
        console.error(
          "[CartStore] localStorage quota exceeded. Clearing and retrying."
        );
        try {
          localStorage.removeItem(name);
          localStorage.setItem(name, value);
        } catch (retryError) {
          console.error(
            "[CartStore] Retry failed. Cart will not persist this session.",
            retryError
          );
        }
      } else {
        console.error("[CartStore] Unexpected storage error:", error);
      }
    }
  },

  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // no-op
    }
  },
};

// ─── Store ────────────────────────────────────────────────────────────────────

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // ✅ NO sanitization here — full product object stays in memory
      // so checkout page can read FinalProduct, FinalProductImages, baseImage, etc.
      addToCart: (product) =>
        set((state) => ({ cart: [...state.cart, product] })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, productQuantity: item.productQuantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.productQuantity > 1
              ? { ...item, productQuantity: item.productQuantity - 1 }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),

    {
      name: "moments-cart-storage",
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({
        cart: Array.isArray(state.cart)
          ? state.cart.map(sanitizeForStorage)
          : [],
      }),
    }
  )
);

export default useCartStore;