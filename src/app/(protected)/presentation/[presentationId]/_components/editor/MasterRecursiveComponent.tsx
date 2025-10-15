"use client";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import DropZone2 from "./DropZone2";
import { ContentItem } from "@/lib/types";

// ⚙️ Props
type MasterRecursiveComponentProps = {
  content: ContentItem | ContentItem[]; // ✅ now supports arrays
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
};

// 🎨 Animation props for subtle fade-in
const animationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      onContentChange,
      slideId,
      index,
      isEditable = true,
      isPreview = false,
    }) => {
      // ✅ Handle missing or empty content
      if (!content) return null;

      // 🟢 Handle array of components (your slides)
      if (Array.isArray(content)) {
        return (
          <>
            {content.map((item, i) => (
              <MasterRecursiveComponent
                key={item.id || i}
                content={item}
                onContentChange={onContentChange}
                slideId={slideId}
                index={i}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            ))}
          </>
        );
      }

      // 🧠 Handle individual content item
      const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          onContentChange(content.id, e.target.value);
        },
        [content.id, onContentChange]
      );

      // 🎨 Dynamic styling
      const style = content.style || {};

      switch (content.type) {
        // 🟢 Title / Heading
        case "title":
        case "heading1":
          return (
            <motion.h1
              {...animationProps}
              style={style}
              className="text-3xl font-bold text-center"
            >
              {content.content}
            </motion.h1>
          );

        // 🟣 Heading 2 / Section headers
        case "heading2":
          return (
            <motion.h2
              {...animationProps}
              style={style}
              className="text-2xl font-semibold mt-4 mb-2"
            >
              {content.content}
            </motion.h2>
          );

        // 🟠 Heading 3
        case "heading3":
          return (
            <motion.h3
              {...animationProps}
              style={style}
              className="text-xl font-medium mt-3 mb-2"
            >
              {content.content}
            </motion.h3>
          );

        // 🟡 Paragraph text
        case "paragraph":
          return (
            <motion.p
              {...animationProps}
              style={style}
              className="text-base leading-relaxed"
            >
              {content.content}
            </motion.p>
          );

        // 🖼️ Image
        case "image":
          return (
            <motion.img
              {...animationProps}
              style={style}
              src={content.content?.src}
              alt={content.content?.alt || "Image"}
              className="block mx-auto"
            />
          );

        // 📋 Bulleted list
        case "bulletedList":
          return (
            <motion.ul {...animationProps} className="list-disc list-inside">
              {Array.isArray(content.content) &&
                content.content.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
            </motion.ul>
          );

        // 🔢 Numbered list
        case "numberedList":
          return (
            <motion.ol {...animationProps} className="list-decimal list-inside">
              {Array.isArray(content.content) &&
                content.content.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
            </motion.ol>
          );

        // 🧱 Column or Multi-column layout
        case "multiColumn":
        case "column":
          if (Array.isArray(content.children)) {
            return (
              <motion.div
                {...animationProps}
                style={style}
                className={cn(
                  "grid gap-4",
                  content.type === "multiColumn"
                    ? "grid-cols-2"
                    : "flex flex-col"
                )}
              >
                {content.children.map((child: ContentItem, i: number) => (
                  <MasterRecursiveComponent
                    key={child.id || i}
                    content={child}
                    onContentChange={onContentChange}
                    slideId={slideId}
                    index={i}
                    isPreview={isPreview}
                    isEditable={isEditable}
                  />
                ))}
              </motion.div>
            );
          }
          return null;

        // 🧰 Image + Text combination layout
        case "imageAndText":
          if (Array.isArray(content.children)) {
            return (
              <motion.div
                {...animationProps}
                style={style}
                className="flex flex-wrap items-center justify-between gap-4"
              >
                {content.children.map((child: ContentItem, i: number) => (
                  <MasterRecursiveComponent
                    key={child.id || i}
                    content={child}
                    onContentChange={onContentChange}
                    slideId={slideId}
                    index={i}
                    isPreview={isPreview}
                    isEditable={isEditable}
                  />
                ))}
              </motion.div>
            );
          }
          return null;

        // 💡 Highlight / Callout
        case "calloutBox":
          return (
            <motion.div
              {...animationProps}
              style={style}
              className="rounded-lg p-4 bg-gray-50 border-l-4 border-green-500 text-gray-700"
            >
              {content.content}
            </motion.div>
          );

        // 🧩 Fallback
        default:
          return (
            <motion.div
              {...animationProps}
              className="p-4 text-center text-gray-400"
            >
              <h1>Nothing here yet</h1>
            </motion.div>
          );
      }
    }
  );

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";
