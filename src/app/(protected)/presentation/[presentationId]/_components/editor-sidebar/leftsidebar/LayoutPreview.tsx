import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useSlideStore } from "@/store/useSlideStore";
import { useEffect, useState } from "react";
import { DraggableSlide } from "../../editor/Editor";

type Props = {};

const LayoutPreview = (props: Props) => {
  const { getOrderSlides, reorderSlides } = useSlideStore();
  const [loading, setLoading] = useState(true);

  const slides = getOrderSlides();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  return (
    <div className="w-64 h-full fixed left-0 top-20 border-r overflow-y-auto">
      <ScrollArea suppressHydrationWarning className="h-full w-full">
        {loading ? (
          <div className="w-full px-4 flex flex-col space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">
                SLIDES
              </h2>
              <span
                suppressHydrationWarning
                className="text-xs dark:text-gray-200 text-gray-400"
              >
                {slides.length} {slides.length === 1 ? "Slide" : "Slides"}
              </span>
            </div>
            {/* WIP: add dragable slide preview after you build the editor */}
            {/* {slides.map((slide, index) => (
              <DraggableSlide
                key={slide.id || index}
                slide={slide}
                index={index}
                moveSlide={moveSlide}
              />
            ))} */}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
