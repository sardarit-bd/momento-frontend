// store/useDeckFinalPreview.js
import { create } from "zustand";

const useDeckFinalPreview = create((set) => ({
    deckcart: [],

    addToCart: (item) => set((state) => ({
        deckcart: [...state.deckcart, item]
    })),

    // ✅ THIS WAS MISSING
    updateCart: (updatedItem) => set((state) => ({
        deckcart: state.deckcart.map((item) =>
            item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        )
    })),

    removeFromCart: (productId) => set((state) => ({
        deckcart: state.deckcart.filter((item) => item.productId !== productId)
    })),

    clearCart: () => set({ deckcart: [] }),
}));

export default useDeckFinalPreview;