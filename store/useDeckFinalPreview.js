import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createHybridStorage } from "./createHybridStorage";

const useDeckFinalPreview = create(
  persist(
    (set) => ({
      deckcart: [],

      addToCart: (item) => {
        set((state) => ({
          deckcart: [...state.deckcart, item],
        }));
      },

      updateCart: (updatedItem) =>
        set((state) => ({
          deckcart: state.deckcart.map((item) =>
            item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
          ),
        })),

      removeFromCart: (productId) =>
        set((state) => ({
          deckcart: state.deckcart.filter(
            (item) => item.productId !== productId,
          ),
        })),

      clearCart: () => set({ deckcart: [] }),
    }),
    {
      name: "momento-deck-preview-storage",
      storage: createJSONStorage(() => createHybridStorage("deck-preview")),
      partialize: (state) => ({
        deckcart: state.deckcart.map((item) => ({
          id: item.id,
          productId: item.productId,
          productType: item.productType,
          productName: item.productName ?? null,
          productSlug: item.productSlug ?? null,
          productQuantity: item.productQuantity ?? 1,
          productImage: item.productImage ?? null,
          customization_mode: item.customization_mode ?? "deck",
          FinalProduct: Array.isArray(item.FinalProduct)
            ? item.FinalProduct
            : [],
          FinalProductImages: Array.isArray(item.FinalProductImages)
            ? item.FinalProductImages
            : [],
          CharacterImages: Array.isArray(item.CharacterImages)
            ? item.CharacterImages
            : [],
          BoxImage: item.BoxImage ?? null,
        })),
      }),
    },
  ),
);

export default useDeckFinalPreview;
