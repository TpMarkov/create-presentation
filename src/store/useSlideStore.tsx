import { Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  currentTheme: Theme;
  currentSlide: number;
  removeSlide: (id: string) => void;
  setSlides: (slides: Slide[]) => void;
  setProject: (project: Project) => void;
  setCurrentTheme: (theme: Theme) => void;
  getOrderSlides: () => Slide[];
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  addSlideAtIndex: (slide: Slide, index: number) => void;
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
    (set, get) => ({
      slides: [],
      currentSlide: 0,
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
      getOrderSlides: () => {
        const state = get();
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },
      reorderSlides: (fromIndex, toIndex) => {
        set((state) => {
          const newSlides = [...state.slides];
          const [removed] = newSlides.splice(fromIndex, 1);
          newSlides.splice(toIndex, 0, removed);
          return {
            slides: newSlides.map((slide, index) => ({
              ...slide,
              slideOrder: index,
            })),
          };
        });
      },
      removeSlide: (id) => {
        set((state) => ({
          slides: state.slides.filter((slide) => slide.id !== id),
        }));
      },
      addSlideAtIndex: (slide: Slide, index: number) => {
        set((state) => {
          const newSlides = [...state.slides];
          newSlides.splice(index, 0, { ...slide, id: uuidv4() });
          newSlides.forEach((s, i) => {
            s.slideOrder = i;
          });
          return { slides: newSlides, currentSlide: index };
        });
      },
    }),
    {
      name: "slides-storage",
    }
  )
);
