import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createHybridStorage } from "./createHybridStorage";

const useboxcartstore = create(
  persist(
    (set) => ({
      boxs: [],
      setboxs: (f) => set({ boxs: f }),
    }),
    {
      name: "momento-box-storage",
      storage: createHybridStorage("box-preview"),
      partialize: (state) => ({
        boxs: state.boxs,
      }),
    }
  )
);

export default useboxcartstore;