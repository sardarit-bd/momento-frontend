import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const usePhotoFinalPreview = create(
  persist(
    (set) => ({
      photocart: [],

      addToCart: (item) => set((state) => ({
        photocart: [...state.photocart, item],
      })),

      updateCart: (updatedItem) => set((state) => ({
        photocart: state.photocart.map((item) =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item
        ),
      })),

      removeFromCart: (productId) => set((state) => ({
        photocart: state.photocart.filter((item) => item.productId !== productId),
      })),

      clearCart: () => set({ photocart: [] }),
    }),
    {
      name: "momento-photo-preview-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        photocart: state.photocart.map((item) => ({
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

export default usePhotoFinalPreview;
