"use client";
import { OutlineCard } from "@/lib/types";
import { motion } from "framer-motion";
import { Card as UICard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useRef } from "react";

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onDeleteClick: () => void;
  onEdintChange: (value: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  dragHandlers: {
    onDragStart: (e: React.DragEventHandler) => void;
    onDragEnd: () => void;
  };
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyles: React.CSSProperties;
};
const Card = ({
  card,
  isEditing,
  isSelected,
  editText,
  onEdintChange,
  onEditBlur,
  onEditKeyDown,
  onCardDoubleClick,
  onCardClick,
  onDragOver,
  dragOverStyles,
  dragHandlers,
  onDeleteClick,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, mass: 1 }}
      className="relative"
    >
      <div
        draggable
        onDragOver={onDragOver}
        style={dragOverStyles}
        {...dragHandlers}
      >
        <UICard
          className={`p-4 cursor-grab active:cursor-grabbing bg-primary-90 ${
            isEditing || isSelected ? "border-primary bg-transparent" : ""
          }`}
          onClick={onCardClick}
          onDoubleClick={onCardDoubleClick}
        >
          <div className="flex justify-between items-center">
            {isEditing ? (
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => onEdintChange(e.target.value)}
                onKeyDown={onEditKeyDown}
                className="text-base sm:text-lg"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className={`text-base sm:text-lg py-1 px-4 rounded-xl bg-primary-20 ${
                    isEditing || isSelected ? "bg-secondary-90" : ""
                  }`}
                >
                  {card.order}
                </span>
                <span className="text-base sm:text-lg">{card.title}</span>
              </div>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
              aria-label={`Delete card ${card.order}`}
            >
              <Trash2Icon></Trash2Icon>
            </Button>
          </div>
        </UICard>
      </div>
    </motion.div>
  );
};

export default Card;
