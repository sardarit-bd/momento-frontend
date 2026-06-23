import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useDeckFinalPreview = create(
  persist(
    (set) => ({
      deckcart: [],

      addToCart: (item) => set((state) => ({
        deckcart: [...state.deckcart, item],
      })),

      updateCart: (updatedItem) => set((state) => ({
        deckcart: state.deckcart.map((item) =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        ),
      })),

      removeFromCart: (productId) => set((state) => ({
        deckcart: state.deckcart.filter((item) => item.productId !== productId),
      })),

      clearCart: () => set({ deckcart: [] }),
    }),
    {
      name: "momento-deck-preview-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        deckcart: state.deckcart.map((item) => ({
          id: item.id,
          productId: item.productId,
          productType: item.productType,
          CharacterImages: item.CharacterImages ?? [],
          BoxImage: item.BoxImage ?? null,
        })),
      }),
    }
  )
);

export default useDeckFinalPreview;