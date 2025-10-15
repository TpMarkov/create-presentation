"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutSlides, Slide } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { isDragging } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import ContentRenderer, {
  MasterRecursiveComponent,
} from "./MasterRecursiveComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, TrashIcon } from "lucide-react";

interface DropZoneProps {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
  isEditable: boolean;
}
export const DropZone: React.FC<DropZoneProps> = ({
  index,
  onDrop,
  isEditable,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ["SLIDE", "layout"],
    drop: (item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    }) => {
      onDrop(item, index);
    },
    canDrop: () => isEditable,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  if (!isEditable) {
    return null;
  }

  return (
    <div
      className={cn(
        "h-4 rounded-md transition-all duration-200",
        isOver && canDrop ? "border-green-500 bg-green-100" : "border-gray-300",
        canDrop ? "border-blue-300" : ""
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">
          Drop hereww
        </div>
      )}
    </div>
  );
};

type Props = {
  isEditable: boolean;
};
interface DraggableSlideProps {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
  isEditable: boolean;
}

export const DraggableSlide: React.FC<DraggableSlideProps> = ({
  slide,
  index,
  moveSlide,
  handleDelete,
  isEditable,
}: DraggableSlideProps) => {
  const ref = useRef(null);
  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } =
    useSlideStore();
  const [{ isDragging }, drag] = useDrag({
    type: "SLIDE",
    item: {
      index,
      type: "SLIDE",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  const handleContentChange = (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => {
    console.log("Content changed", slide, contentId, newContent);

    updateContentItem(slide.id, contentId, newContent);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "w-full roiunded-lg shadow-lg relative p-0 min-h-[400px] max-h-[800px]",
        "shadow-xl transition-shadow duration-300",
        "flex flex-col",
        index === currentSlide ? "ring-2 ring-blue-500 ring-offset-2" : "",
        // slide.className,
        isDragging ? "opacity-50" : "opacity-100"
      )}
      style={{
        backgroundImage: currentTheme.gradientBackground,
      }}
      onClick={() => {
        setCurrentSlide(index);
      }}
    >
      <div className="h-full w-full flex-grow overflow-hidden">
        <MasterRecursiveComponent
          content={slide.content}
          isEditable={isEditable}
          slideId={slide.id}
          isPreview={false}
          onContentChange={handleContentChange}
        />
      </div>
      {isEditable && (
        <Popover>
          <PopoverTrigger className="absolute top-2 left-2">
            <Button size="sm" variant="outline">
              <EllipsisIcon className="w-5 h-5" />
              <span className="sr-only">Slide options</span>
            </Button>
            <PopoverContent className="w-fit p-0">
              <div>
                <Button variant="ghost" onClick={() => handleDelete(slide.id)}>
                  <TrashIcon className="w-5 h-5 text-red-500" />
                  <span className="sr-only">Delete slide</span>
                </Button>
              </div>
            </PopoverContent>
          </PopoverTrigger>
        </Popover>
      )}
    </div>
  );
};

const Editor = ({ isEditable }: Props) => {
  const [loading, setLoading] = useState();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    getOrderSlides,
    setSlides,
    currentTheme,
    slides,
    removeSlide,
    addSlideAtIndex,
    reorderSlides,
    currentSlide,
  } = useSlideStore();

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditable) {
      reorderSlides(dragIndex, hoverIndex);
    }
  };

  const handleDelete = (id: string) => {
    if (isEditable) {
      console.log("Deleting", id);
      removeSlide(id);
    }
  };

  const getOrderedSlides = getOrderSlides();

  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => {
    if (!isEditable) return;
    if (item.type === "layout") {
      addSlideAtIndex(
        {
          ...item.component,
          id: uuidv4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === "SLIDE" && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };

  useEffect(() => {
    if (slideRefs.current[currentSlide]) {
      slideRefs.current[currentSlide]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentSlide]);

  return (
    <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20">
      {loading ? (
        <div className="w-full px-4 flex flex-col space-y-6">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-8">
          <div className="px-4 pb-4 space-y-4 pt-2">
            {isEditable && (
              <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
            )}
            {getOrderedSlides.map((slide, i) => (
              <React.Fragment key={slide.id || i}>
                <DraggableSlide
                  slide={slide}
                  index={i}
                  moveSlide={moveSlide}
                  handleDelete={handleDelete}
                  isEditable={isEditable}
                />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
