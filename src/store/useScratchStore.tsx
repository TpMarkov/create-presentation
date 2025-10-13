import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type OutlineStore = {
  outlines: OutlineCard[];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  resetOutlines: () => void;
};

export const useScratchStore = create<OutlineStore>()(
  devtools(
    persist(
      (set) => ({
        outlines: [],

        resetOutlines: () => set({ outlines: [] }),

        addOutline: (outline: OutlineCard) =>
          set((state) => ({
            outlines: [...state.outlines, outline],
          })),

        addMultipleOutlines: (outlines: OutlineCard[]) =>
          set(() => ({
            outlines: [...outlines],
          })),
      }),
      {
        name: "scratc", // ✅ persist key name must go here
      }
    )
  )
);
