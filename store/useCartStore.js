import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
    }
  )
);

export default useCartStore;
