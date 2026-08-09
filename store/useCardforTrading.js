import { create } from "zustand";

const useCardforTrading = create((set) => ({
    cards: [],
    setCards: (f) => set({ cards: f }),
}));

export default useCardforTrading;
