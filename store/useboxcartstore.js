import { create } from "zustand";

const useboxcartstore = create((set) => ({
    boxs: [],
    setboxs: (f) => set({ boxs: f }),
}));

export default useboxcartstore;
