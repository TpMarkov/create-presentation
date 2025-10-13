"use client";
import { containerVariants } from "@/lib/constants";
import { OutlineCard } from "@/lib/types";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import Card from "./Card";
import AddCardButton from "./AddCardButton";

type Props = {
  outlines: OutlineCard[];
  editingCard: string | null;
  selectedCard: string | null;
  editText: string;
  addOutline?: (card: OutlineCard) => void;
  onEditChange: (value: string) => void;
  onCardSelect: (id: string) => void;
  onCardDoubleClick: (id: string, title: string) => void;
  setEditingCard: (id: string | null) => void;
  setSelectedCard: (id: string | null) => void;
  addMultipleOutlines: (cards: OutlineCard[]) => void;
  setEditText: (value: string) => void;
};

const CardList = ({
  outlines,
  editingCard,
  selectedCard,
  editText,
  onEditChange,
  addOutline,
  onCardSelect,
  onCardDoubleClick,
  setEditingCard,
  setEditText,
  setSelectedCard,
  addMultipleOutlines,
}: Props) => {
  const [dragedItem, setDragedItem] = useState<OutlineCard | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragOffsetY = useRef<number>(0);

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

    const [removedCard] = updatedCards.splice(dragedIntex, 1);

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

  const onCardUpdate = (id: string, newTitle: string) => {
    addMultipleOutlines(
      outlines.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card
      )
    );
    setEditingCard(null);
    setSelectedCard(null);
    setEditText("");
  };

  const onCardDelete = (id: string) => {
    addMultipleOutlines(
      outlines
        .filter((card) => card.id !== id)
        .map((card, index) => ({ ...card, order: index + 1 }))
    );
  };

  const onDragStart = (e: React.DragEvent, card: OutlineCard) => {
    setDragedItem(card);
    e.dataTransfer.effectAllowed = "move";

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragOffsetY.current = e.clientY - rect.top;
    const dragedEl = e.currentTarget.cloneNode(true) as HTMLElement;
    dragedEl.style.position = "absolute";
    dragedEl.style.top = "-1000px";
    dragedEl.style.opacity = "0.8";
    dragedEl.style.width = `${(e.currentTarget as HTMLElement).offsetWidth}px`;
    document.body.appendChild(dragedEl);
    e.dataTransfer.setDragImage(dragedEl, 0, dragOffsetY.current);

    setTimeout(() => {
      setDragOverIndex(outlines.findIndex((c) => c.id === card.id));
      document.body.removeChild(dragedEl);
    }, 0);
  };

  const onDragEnd = () => {
    setDragedItem(null);
    setDragOverIndex(null);
  };

  const onAddCard = (index: number) => {
    const newCard = {
      id: crypto.randomUUID(),
      title: editText || "New Section",
      order: (index !== undefined ? index + 1 : outlines.length) + 1,
    };

    const updatedCards =
      index !== undefined
        ? [
            ...outlines.slice(0, index + 1),
            newCard,
            ...outlines
              .slice(index + 1)
              .map((card) => ({ ...card, order: card.order + 1 })),
          ]
        : [...outlines, newCard];

    addMultipleOutlines(updatedCards);
    setEditText("");
  };

  const getDragOverStyles = (cardIndex: number) => {
    if (dragOverIndex === 0 || dragedItem === null) {
      return {};
    }
    if (cardIndex === dragOverIndex) {
      return {
        borderTop: "2px soli #000",
        marginTop: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      };
    } else if (dragOverIndex !== null && cardIndex === dragOverIndex - 1) {
      return {
        borderBottom: "2px soli #000",
        marginBottom: "0.5rem",
        transition: "margin 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      };
    }
    return {};
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
      <AnimatePresence>
        {outlines.map((card, index) => (
          <React.Fragment key={card.id}>
            <Card
              onDragOver={(e) => onDragOver(e, index)}
              card={card}
              isEditing={editingCard === card.id}
              isSelected={selectedCard === card.id}
              editText={editText}
              onEdintChange={onEditChange}
              onEditBlur={() => onCardUpdate(card.id, editText)}
              onEditKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCardUpdate(card.id, editText);
                }
              }}
              onCardClick={() => onCardSelect(card.id)}
              onCardDoubleClick={() => onCardDoubleClick(card.id, card.title)}
              onDeleteClick={() => onCardDelete(card.id)}
              dragHandlers={{
                onDragStart: (e) => onDragStart(e, card),
                onDragEnd: onDragEnd,
              }}
              dragOverStyles={getDragOverStyles(index)}
            />
            <AddCardButton onAddCard={() => onAddCard(index)} />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardList;
