import { Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  currentTheme: Theme;
  setSlides: (slides: Slide[]) => void;
  setProject: (project: Project) => void;
  setCurrentTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  name: "Default",
  fontFamily: "'Inter', sans-serif",
  fontColor: "#333333",
  backgroundColor: "#f0f0f0",
  slideBackgroundColor: "#ffffff",
  accentColor: "#3b82f6",
  type: "light",
};

export const useSlideStore = create(
  persist<SlideState>(
    (set) => ({
      slides: [],
      project: null,
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => {
        set(() => ({
          currentTheme: theme,
        }));
      },
      setSlides: (slides: Slide[]) => set({ slides }),
      setProject: (project: Project) =>
        set({
          project,
        }),
    }),
    {
      name: "slides-storage",
    }
  )
);
