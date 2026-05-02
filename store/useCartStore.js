import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const isLargeDataImage = (value) =>
  typeof value === "string" &&
  value.startsWith("data:image/") &&
  value.length > 50000;

const sanitizeCartItemForPersist = (item) => {
  if (!item || typeof item !== "object") return item;

  const sanitizedFinalProduct = Array.isArray(item.FinalProduct)
    ? item.FinalProduct.map((card) => {
        if (typeof card === "string") {
          return isLargeDataImage(card) ? null : card;
        }
        if (card && typeof card === "object") {
          const next = { ...card };
          if (isLargeDataImage(next.image)) delete next.image;
          if (isLargeDataImage(next.baseImage)) delete next.baseImage;
          if (isLargeDataImage(next.src)) delete next.src;
          return next;
        }
        return card;
      }).filter(Boolean)
    : item.FinalProduct;

  const sanitizedFinalProductImages = Array.isArray(item.FinalProductImages)
    ? item.FinalProductImages.filter((img) => !isLargeDataImage(img))
    : item.FinalProductImages;

  return {
    ...item,
    FinalProduct: sanitizedFinalProduct,
    FinalProductImages: sanitizedFinalProductImages,
    // Avoid persisting binary payloads to localStorage.
    FinalPDf: null,
  };
};

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),

      // Remove item from cart by product id
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // Increase quantity
      increaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, productQuantity: item.productQuantity + 1 }
              : item
          ),
        })),

      // Decrease quantity
      decreaseQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id && item.productQuantity > 1
              ? { ...item, productQuantity: item.productQuantity - 1 }
              : item
          ),
        })),

      // Clear all cart items (used after successful payment)
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "moments-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        ...state,
        cart: Array.isArray(state.cart)
          ? state.cart.map(sanitizeCartItemForPersist)
          : [],
      }),
    }
  )
);

export default useCartStore;
