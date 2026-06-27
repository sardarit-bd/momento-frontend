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

const sanitizeForStorage = (item) => {
  if (!item || typeof item !== "object") return item;

  const stripped = deepStripLargeImages(item);

  return {
    ...stripped,
    // Strip images for both trading and deck cards — restored from IDB on checkout
    FinalProduct: Array.isArray(item.FinalProduct)
      ? item.FinalProduct.map((card) => ({ ...card, image: null, character_image: null }))
      : [],
    FinalProductImages: [],
    CharacterImages: [],
    FinalPDf: null,
    FinalPDFBlob: null,
  };
};

// ─── Safe localStorage wrapper ────────────────────────────────────────────────

const idbCartKey      = (cartId) => `cart-images:${cartId}`;
const idbDeckCartKey  = (cartId) => `cart-deck-images:${cartId}`;

// ── Trading card (existing — unchanged) ──────────────────────────────────────

export const saveCartImagesToIDB = async (cartItems) => {
  const { idbPut } = await import("@/app/(allsite)/(application)/application/tradingcard/[slug]/_tradingcard/lib/idb");
  for (const item of cartItems) {
    if (!item?.id || !Array.isArray(item?.FinalProduct)) continue;
    if (item?.customization_mode !== "trading") continue;
    const key = idbCartKey(item.id);
    const result = await idbPut(key, { FinalProduct: item.FinalProduct });
  }
};

export const restoreCartImagesFromIDB = async (cartItems) => {
  const { idbGet } = await import("@/app/(allsite)/(application)/application/tradingcard/[slug]/_tradingcard/lib/idb");
  return Promise.all(
    cartItems.map(async (item) => {
      if (!item?.id) return item;
      if (item?.customization_mode !== "trading") return item;
      try {
        const key = idbCartKey(item.id);
        const saved = await idbGet(key);
        if (saved?.FinalProduct) {
          return { ...item, FinalProduct: saved.FinalProduct };
        } else {
          console.warn("No FinalProduct found in IDB for key:", key);
        }
      } catch (e) {
        console.error("IDB get error:", e);
      }
      return item;
    })
  );
};

// ── Deck card (new) ───────────────────────────────────────────────────────────

/**
 * Persists deck card composited images to IDB.
 * Called from ProductCustomizer right before router.push to /final/customization.
 *
 * Saves:
 *   FinalProduct      — array of { rank, image, name, character_image }
 *   FinalProductImages — array of base64 strings (one per card)
 *   CharacterImages    — array of base64 strings (one per card)
 */
export const saveDeckCartImagesToIDB = async (cartItems) => {
  const { idbPut } = await import("@/app/(allsite)/(application)/application/tradingcard/[slug]/_tradingcard/lib/idb");
  for (const item of cartItems) {
    if (!item?.id) continue;
    if (item?.customization_mode !== "deck") continue;
    const key = idbDeckCartKey(item.id);

    await idbPut(key, {
      FinalProduct:       item.FinalProduct       ?? [],
      FinalProductImages: item.FinalProductImages ?? [],
      CharacterImages:    item.CharacterImages    ?? [],
    });
  }
};

/**
 * Restores deck card images from IDB into cart items.
 * Called from CheckoutPage alongside the existing trading card restore.
 */
export const restoreDeckCartImagesFromIDB = async (cartItems) => {
  const { idbGet } = await import("@/app/(allsite)/(application)/application/tradingcard/[slug]/_tradingcard/lib/idb");
  return Promise.all(
    cartItems.map(async (item) => {
      if (!item?.id) return item;
      if (item?.customization_mode !== "deck") return item;
      try {
        const key = idbDeckCartKey(item.id);

        const saved = await idbGet(key);
        if (saved?.FinalProduct?.length) {
          return {
            ...item,
            FinalProduct:       saved.FinalProduct,
            FinalProductImages: saved.FinalProductImages ?? [],
            CharacterImages:    saved.CharacterImages    ?? [],
          };
        } else {
          console.warn("No deck FinalProduct found in IDB for key:", key);
        }
      } catch (e) {
        console.error("IDB deck get error:", e);
      }
      return item;
    })
  );
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