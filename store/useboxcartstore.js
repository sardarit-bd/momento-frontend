import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createHybridStorage } from "./createHybridStorage";

const useboxcartstore = create(
  persist(
    (set) => ({
      boxs: [],
      setboxs: (f) => set({ boxs: f }),
    }),
    {
      name: "momento-box-storage",
      storage: createJSONStorage(() => createHybridStorage("box-preview")),
    }
  )
);

export default useboxcartstore;