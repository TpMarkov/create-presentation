import { ContentItem, Slide, Theme } from "@/lib/types";
import { Project } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { ItemContent } from "@/components/ui/item";

interface SlideState {
  slides: Slide[];
  project: Project | null;
  currentTheme: Theme;
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  updateContentItem: (
    slideId: string,
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
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
      setCurrentSlide: (index: number) => {
        set({ currentSlide: index });
      },
      updateContentItem: (slideId, contentId, newContent) => {
        set((state) => {
          const updateContentRecursivly = (item: ContentItem): ContentItem => {
            if (item.id === contentId) {
              return { ...item, content: newContent };
            }

            if (
              Array.isArray(item.content) &&
              item.content.every((i) => typeof i !== "string")
            ) {
              return {
                ...item,
                content: item.content.map((subItem) => {
                  if (typeof subItem !== "string") {
                    return updateContentRecursivly(subItem as ContentItem);
                  }
                  return subItem;
                }) as ContentItem[],
              };
            }
            return item;
          };
          return {
            slides: state.slides.map((slide) =>
              slide.id === slideId
                ? { ...slide, content: updateContentRecursivly(slide.content) }
                : slide
            ),
          };
        });
      },
    }),
    {
      name: "slides-storage",
    }
  )
);
