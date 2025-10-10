export interface Slide {
  id: string;
  slideName: string;
  type: string;
  content: ContentItem;
  slideOrder: number;
  className?: string;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  name: string;
  content: ContentItem[] | string | string[] | string[][];
  initialRows?: number;
  initialColumns?: number;
  restrictialColumns?: number;
  restrictToDrop?: boolean;
  clumns?: number;
  placeholede?: string;
  className?: string;
  alt?: string;
  callOutType?: "success" | "warning" | "info" | "question" | "caution";
  link?: string;
  code?: string;
  bgColor?: string;
  isTransparent?: boolean;
}

export type ContentType =
  | "column"
  | "resizable-column"
  | "text"
  | "paragraph"
  | "image"
  | "table"
  | "multiColumn"
  | "blank"
  | "imageAndText"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "title"
  | "table"
  | "blockquote"
  | "numberedList"
  | "bulletedList"
  | "code"
  | "link"
  | "quote"
  | "devider"
  | "calloutBox"
  | "todoList"
  | "codeBlock"
  | "customButton"
  | "table"
  | "tableOfContents";
