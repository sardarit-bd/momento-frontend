import { create } from "zustand";

const useTradingFinalPreview = create((set, get) => ({
  tradingcart: [],
  addToCart: (product) =>
    set((state) => ({ tradingcart: [...state.tradingcart, product] })),
  removeFromCart: (id) =>
    set((state) => ({
      tradingcart: state.tradingcart.filter(
        (item, index) => item.productId !== id,
      ),
    })),
  clearCart: () => set({ tradingcart: [] }),
}));

export default useTradingFinalPreview;
