// import { create } from "zustand";

// const useboxcartstore = create((set) => ({
//     boxs: [],
//     setboxs: (f) => set({ boxs: f }),
// }));

// export default useboxcartstore;


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useboxcartstore = create(
  persist(
    (set) => ({
      boxs: [],
      setboxs: (f) => set({ boxs: f }),
    }),
    {
      name: "momento-box-storage",
      storage: createJSONStorage(() => {
        return {
          getItem: (name) => {
            try { return localStorage.getItem(name); } catch { return null; }
          },
          setItem: (name, value) => {
            try { localStorage.setItem(name, value); } catch (e) {
              console.warn("Box storage failed:", e.message);
            }
          },
          removeItem: (name) => {
            try { localStorage.removeItem(name); } catch {}
          },
        };
      }),
    }
  )
);

export default useboxcartstore;