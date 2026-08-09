import { create } from "zustand";

const usedashboardsidebercontroller = create((set) => ({
    isSideberOpen: false,
    setisSideberOpen: (open) => set({ isSideberOpen: open }),
}));

export default usedashboardsidebercontroller;
