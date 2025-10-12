"use client";
import { containerVariants } from "@/lib/constants";
import { OutlineCard } from "@/lib/types";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditText: (value: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
};

const CardList = ({
  outlines,
  editingCard,
  selectedCard,
  editText,
  addOutline,
  onEditChange,
  onCardSelect,
  onCardDoubleClick,
  setEditText,
  setEditingCard,
  setSelectedCard,
  addMultipleOutlines,
}: Props) => {
  const [dragedItem, setDragedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!dragedItem) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const threshold = rect.height / 2;

    if (y < threshold) {
      setDragOverIndex(index);
    } else {
      setDragOverIndex(index + 1);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragedItem || dragOverIndex === null) {
      return;
    }

    const updatedCards = [...outlines];
    const dragedIntex = updatedCards.findIndex(
      (card) => card.id === dragedItem.id
    );

    if (dragedIntex === -1 || dragedIntex === dragOverIndex) return;

    const [removedCard] = updatedCards.slice(dragedIntex, 1);

    updatedCards.splice(
      dragOverIndex > dragedIntex ? dragOverIndex - 1 : dragOverIndex,
      0,
      removedCard
    );

    addMultipleOutlines(
      updatedCards.map((card, i) => ({
        ...card,
        order: i + 1,
      }))
    );
    setDragedItem(null);
    setDragOverIndex(null);
  };
  return (
    <motion.div
      variants={containerVariants}
      className="space-y-2"
      layout
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (
          outlines.length === 0 ||
          e.clientY > e.currentTarget.getBoundingClientRect().bottom - 20
        ) {
          onDragOver(e, outlines.length);
        }
      }}
    >
      <AnimatePresence></AnimatePresence>
    </motion.div>
  );
};

export default CardList;
