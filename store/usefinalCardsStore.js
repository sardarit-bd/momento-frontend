import { create } from "zustand";

const usefinalCardsStore = create((set) => ({
    finalCards: [],
    setfinalCards: (f) => set({ finalCards: f }),
}));

export default usefinalCardsStore;
