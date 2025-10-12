import { OutlineCard } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreativeAIStore = {
  outlines: OutlineCard[] | [];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  currentAIPrompt: string;
  setCurrentAIPrompt: (prompt: string) => void;
  resetOutlines: () => void;
};
const useCreativeAIStore = create<CreativeAIStore>()(
  persist(
    (set) => ({
      outlines: [],
      currentAIPrompt: "",
      addMultipleOutlines: (outlines: OutlineCard[]) => {
        set(() => ({
          outlines: [...outlines],
        }));
      },
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      setCurrentAIPrompt: (prompt: string) => {
        set(() => ({
          currentAIPrompt: prompt,
        }));
      },
      resetOutlines: () => {
        set(() => ({
          outlines: [],
        }));
      },
    }),
    { name: "creative-ai" }
  )
);

export default useCreativeAIStore;
