import { create } from "zustand";

const useFilterStore = create((set) => ({
    type: "all",
    settype: (typ) => set({ type: typ }),
}));

export default useFilterStore;