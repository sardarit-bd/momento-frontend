import { create } from "zustand";

const useDeckFinalPreview = create((set, get) => ({
    deckcart: [],
    addToCart: (product) => set((state) => ({ deckcart: [...state.deckcart, product] })),
    updateCart: (updatedItem) => set((state) => ({
        deckcart: state.deckcart.map((item) =>
            item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        ),
    })),
    removeFromCart: (id) => set((state) => ({
        deckcart: state.deckcart.filter((item) => item.productId !== id),
    })),
    clearCart: () => set({ deckcart: [] }),
}));

export default useDeckFinalPreview;