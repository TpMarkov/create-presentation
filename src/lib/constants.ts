import {
  BookTemplateIcon,
  HomeIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";
import { ContentType, Slide, Theme } from "./types";
import { v4 as uuidv4 } from "uuid";

export const data = {
  user: {
    name: "Shadcnm",
    email: "m@example.com",
    avatar: "avatar/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: HomeIcon,
    },
    { title: "Trash", url: "/trash", icon: TrashIcon },
    {
      title: "Templates",
      url: "/templates",
      icon: BookTemplateIcon,
    },
    { title: "Settings", url: "/settings", icon: SettingsIcon },
  ],
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const themes: Theme[] = [
  {
    name: "Default",
    fontFamily: "'Inter', sans-serif",
    fontColor: "#000000",
    backgroundColor: "#f0f0f0",
    accentColor: "#3b82f6",
    navbarColor: "#ffffff",
    slideBackgroundColor: "#f0f0f0",
    type: "light",
  },
  {
    name: "Dark Elegance",
    fontFamily: "'Playfair Display', serif",
    fontColor: "#ffffff",
    backgroundColor: "#121212",
    slideBackgroundColor: "#2a2a2a",
    accentColor: "#ffd700",
    gradientBackground: "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
    navbarColor: "#2a2a2a",
    sidebarColor: "#121212",
    type: "dark",
  },
  {
    name: "Aurora Drift",
    fontFamily: "'Poppins', sans-serif",
    fontColor: "#e0f2fe",
    backgroundColor: "#0f172a",
    slideBackgroundColor: "#1e3a8a",
    accentColor: "#38bdf8",
    gradientBackground:
      "linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #38bdf8 100%)",
    navbarColor: "#1e3a8a",
    sidebarColor: "#0f172a",
    type: "dark",
  },
  {
    name: "Solar Dawn",
    fontFamily: "'Inter', sans-serif",
    fontColor: "#1a1a1a",
    backgroundColor: "#fff7e6",
    slideBackgroundColor: "#ffe0b2",
    accentColor: "#f59e0b",
    gradientBackground:
      "linear-gradient(135deg, #fff7e6 0%, #ffedd5 40%, #fbbf24 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#ffedd5",
    type: "light",
  },
  {
    name: "Cyber Aurora",
    fontFamily: "'Orbitron', sans-serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#000000",
    slideBackgroundColor: "#111827",
    accentColor: "#22d3ee",
    gradientBackground:
      "linear-gradient(135deg, #000000 0%, #1e293b 50%, #22d3ee 100%)",
    navbarColor: "#111827",
    sidebarColor: "#000000",
    type: "dark",
  },
  {
    name: "Velvet Sunset",
    fontFamily: "'Nunito', sans-serif",
    fontColor: "#2e2e2e",
    backgroundColor: "#fff5f7",
    slideBackgroundColor: "#ffe4e6",
    accentColor: "#fb7185",
    gradientBackground:
      "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 40%, #fda4af 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#ffe4e6",
    type: "light",
  },
  {
    name: "Galactic Violet",
    fontFamily: "'DM Sans', sans-serif",
    fontColor: "#e5e7eb",
    backgroundColor: "#1e1b4b",
    slideBackgroundColor: "#312e81",
    accentColor: "#a855f7",
    gradientBackground:
      "linear-gradient(135deg, #312e81 0%, #4c1d95 50%, #7e22ce 100%)",
    navbarColor: "#312e81",
    sidebarColor: "#1e1b4b",
    type: "dark",
  },
  {
    name: "Mint Horizon",
    fontFamily: "'Manrope', sans-serif",
    fontColor: "#1e293b",
    backgroundColor: "#d1fae5",
    slideBackgroundColor: "#a7f3d0",
    accentColor: "#10b981",
    gradientBackground:
      "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 40%, #10b981 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#a7f3d0",
    type: "light",
  },
  {
    name: "Obsidian Flame",
    fontFamily: "'Raleway', sans-serif",
    fontColor: "#f5f5f5",
    backgroundColor: "#1a1a1a",
    slideBackgroundColor: "#2d0000",
    accentColor: "#ef4444",
    gradientBackground:
      "linear-gradient(135deg, #000000 0%, #2d0000 40%, #7f1d1d 100%)",
    navbarColor: "#2d0000",
    sidebarColor: "#1a1a1a",
    type: "dark",
  },
  {
    name: "Iridescent Sky",
    fontFamily: "'Urbanist', sans-serif",
    fontColor: "#1f2937",
    backgroundColor: "#e0f2fe",
    slideBackgroundColor: "#bae6fd",
    accentColor: "#6366f1",
    gradientBackground:
      "linear-gradient(135deg, #bae6fd 0%, #c7d2fe 50%, #fbcfe8 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#bae6fd",
    type: "light",
  },
  {
    name: "Ocean Breeze",
    fontFamily: "'Poppins', sans-serif",
    fontColor: "#0f172a",
    backgroundColor: "#e0f7fa",
    slideBackgroundColor: "#b2ebf2",
    accentColor: "#0288d1",
    gradientBackground: "linear-gradient(135deg, #b2ebf2 0%, #e0f7fa 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#b2ebf2",
    type: "light",
  },
  {
    name: "Midnight Indigo",
    fontFamily: "'Roboto Slab', serif",
    fontColor: "#e0e7ff",
    backgroundColor: "#1e1b4b",
    slideBackgroundColor: "#312e81",
    accentColor: "#6366f1",
    gradientBackground: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)",
    navbarColor: "#312e81",
    sidebarColor: "#1e1b4b",
    type: "dark",
  },
  {
    name: "Sunset Glow",
    fontFamily: "'Nunito', sans-serif",
    fontColor: "#2e2e2e",
    backgroundColor: "#fff7ed",
    slideBackgroundColor: "#ffe4c4",
    accentColor: "#f97316",
    gradientBackground: "linear-gradient(135deg, #ffe4c4 0%, #fff7ed 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#ffe4c4",
    type: "light",
  },
  {
    name: "Cyber Night",
    fontFamily: "'Orbitron', sans-serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#0a0a0a",
    slideBackgroundColor: "#1a1a1a",
    accentColor: "#00ffff",
    gradientBackground: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
    navbarColor: "#1a1a1a",
    sidebarColor: "#0a0a0a",
    type: "dark",
  },
  {
    name: "Forest Whisper",
    fontFamily: "'Lora', serif",
    fontColor: "#2c3e2f",
    backgroundColor: "#ecf4ee",
    slideBackgroundColor: "#d8e9db",
    accentColor: "#2e7d32",
    gradientBackground: "linear-gradient(135deg, #d8e9db 0%, #ecf4ee 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#d8e9db",
    type: "light",
  },
  {
    name: "Crimson Night",
    fontFamily: "'Merriweather', serif",
    fontColor: "#fff0f0",
    backgroundColor: "#2b0000",
    slideBackgroundColor: "#3c0000",
    accentColor: "#ff4d4d",
    gradientBackground: "linear-gradient(135deg, #3c0000 0%, #2b0000 100%)",
    navbarColor: "#3c0000",
    sidebarColor: "#2b0000",
    type: "dark",
  },
  {
    name: "Lavender Mist",
    fontFamily: "'Quicksand', sans-serif",
    fontColor: "#1f1f1f",
    backgroundColor: "#f3e8ff",
    slideBackgroundColor: "#e9d5ff",
    accentColor: "#a855f7",
    gradientBackground: "linear-gradient(135deg, #e9d5ff 0%, #f3e8ff 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#e9d5ff",
    type: "light",
  },
  {
    name: "Graphite Steel",
    fontFamily: "'Montserrat', sans-serif",
    fontColor: "#e5e5e5",
    backgroundColor: "#202124",
    slideBackgroundColor: "#2d2f33",
    accentColor: "#5f6368",
    gradientBackground: "linear-gradient(135deg, #2d2f33 0%, #202124 100%)",
    navbarColor: "#2d2f33",
    sidebarColor: "#202124",
    type: "dark",
  },
  {
    name: "Peach Cream",
    fontFamily: "'Josefin Sans', sans-serif",
    fontColor: "#3c2f2f",
    backgroundColor: "#fff0e1",
    slideBackgroundColor: "#ffe1c6",
    accentColor: "#ff8a65",
    gradientBackground: "linear-gradient(135deg, #ffe1c6 0%, #fff0e1 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#ffe1c6",
    type: "light",
  },
  {
    name: "Emerald Abyss",
    fontFamily: "'Raleway', sans-serif",
    fontColor: "#d1fae5",
    backgroundColor: "#052e16",
    slideBackgroundColor: "#064e3b",
    accentColor: "#10b981",
    gradientBackground: "linear-gradient(135deg, #064e3b 0%, #052e16 100%)",
    navbarColor: "#064e3b",
    sidebarColor: "#052e16",
    type: "dark",
  },
  {
    name: "Arctic Frost",
    fontFamily: "'Rubik', sans-serif",
    fontColor: "#0f172a",
    backgroundColor: "#f0faff",
    slideBackgroundColor: "#dbeafe",
    accentColor: "#38bdf8",
    gradientBackground: "linear-gradient(135deg, #dbeafe 0%, #f0faff 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#dbeafe",
    type: "light",
  },
  {
    name: "Golden Noir",
    fontFamily: "'Cormorant Garamond', serif",
    fontColor: "#f5f5dc",
    backgroundColor: "#0d0d0d",
    slideBackgroundColor: "#1c1c1c",
    accentColor: "#ffcc00",
    gradientBackground: "linear-gradient(135deg, #1c1c1c 0%, #0d0d0d 100%)",
    navbarColor: "#1c1c1c",
    sidebarColor: "#0d0d0d",
    type: "dark",
  },
  {
    name: "Coral Reef",
    fontFamily: "'Karla', sans-serif",
    fontColor: "#1e293b",
    backgroundColor: "#fff5f5",
    slideBackgroundColor: "#ffe4e6",
    accentColor: "#fb7185",
    gradientBackground: "linear-gradient(135deg, #ffe4e6 0%, #fff5f5 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#ffe4e6",
    type: "light",
  },
  {
    name: "Obsidian Dream",
    fontFamily: "'DM Sans', sans-serif",
    fontColor: "#e5e7eb",
    backgroundColor: "#0b0b0d",
    slideBackgroundColor: "#18181b",
    accentColor: "#8b5cf6",
    gradientBackground: "linear-gradient(135deg, #18181b 0%, #0b0b0d 100%)",
    navbarColor: "#18181b",
    sidebarColor: "#0b0b0d",
    type: "dark",
  },
  {
    name: "Mint Cloud",
    fontFamily: "'Manrope', sans-serif",
    fontColor: "#1e293b",
    backgroundColor: "#e6fffa",
    slideBackgroundColor: "#b2f5ea",
    accentColor: "#0d9488",
    gradientBackground: "linear-gradient(135deg, #b2f5ea 0%, #e6fffa 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#b2f5ea",
    type: "light",
  },
  {
    name: "Royal Plum",
    fontFamily: "'Merriweather Sans', sans-serif",
    fontColor: "#f3e8ff",
    backgroundColor: "#3b0764",
    slideBackgroundColor: "#581c87",
    accentColor: "#a855f7",
    gradientBackground: "linear-gradient(135deg, #581c87 0%, #3b0764 100%)",
    navbarColor: "#581c87",
    sidebarColor: "#3b0764",
    type: "dark",
  },
  {
    name: "Amber Fields",
    fontFamily: "'Source Sans 3', sans-serif",
    fontColor: "#2e2e2e",
    backgroundColor: "#fff8e1",
    slideBackgroundColor: "#ffecb3",
    accentColor: "#fbbf24",
    gradientBackground: "linear-gradient(135deg, #ffecb3 0%, #fff8e1 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#ffecb3",
    type: "light",
  },
  {
    name: "Neon Pulse",
    fontFamily: "'Share Tech Mono', monospace",
    fontColor: "#e0f2fe",
    backgroundColor: "#020617",
    slideBackgroundColor: "#0f172a",
    accentColor: "#22d3ee",
    gradientBackground: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
    navbarColor: "#0f172a",
    sidebarColor: "#020617",
    type: "dark",
  },
  {
    name: "Rose Champagne",
    fontFamily: "'Urbanist', sans-serif",
    fontColor: "#3f3f46",
    backgroundColor: "#fff1f2",
    slideBackgroundColor: "#ffe4e6",
    accentColor: "#f472b6",
    gradientBackground: "linear-gradient(135deg, #ffe4e6 0%, #fff1f2 100%)",
    navbarColor: "#ffffff",
    sidebarColor: "#ffe4e6",
    type: "light",
  },
  {
    name: "Titanium Shadow",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontColor: "#e5e7eb",
    backgroundColor: "#121212",
    slideBackgroundColor: "#1e1e1e",
    accentColor: "#9ca3af",
    gradientBackground: "linear-gradient(135deg, #1e1e1e 0%, #121212 100%)",
    navbarColor: "#1e1e1e",
    sidebarColor: "#121212",
    type: "dark",
  },
];

export const CreatePageCard = [
  {
    title: "Use a",
    highlightedText: "Template",
    description: "Write a prompt and leave everything else for use to handle",
    type: "template",
  },
  {
    title: "Generate with",
    highlightedText: "Creative AI",
    description: "Write a prompt and leave everything else for use to handle",
    type: "creative-ai",
    highligh: true,
  },
  {
    title: "Start from",
    highlightedText: "Scratch",
    description: "Write a prompt and leave everything else for use to handle",
    type: "create-scratch",
  },
];

type LayoutComponent = {
  type: ContentType;
  content?: string | string[] | { src?: string; alt?: string };
  style?: Record<string, string>;
  children?: LayoutComponent[];
};

type Layout = {
  id: string;
  name: string;
  description: string;
  layoutType: string;
  components: LayoutComponent[];
};

export const existingLayouts: Layout[] = [
  {
    id: uuidv4(),
    name: "Title Slide",
    description:
      "An introductory slide with a centered title, subtitle, and background image.",
    layoutType: "intro",
    components: [
      {
        type: "title",
        content: "Welcome to the Future of AI",
        style: {
          textAlign: "center",
          fontSize: "3rem",
          fontWeight: "bold",
        },
      },
      {
        type: "paragraph",
        content:
          "Exploring innovation, creativity, and intelligence redefined.",
        style: {
          textAlign: "center",
          fontSize: "1.25rem",
          color: "#666",
          marginTop: "1rem",
        },
      },
      {
        type: "image",
        content: {
          alt: "Futuristic neural network visualization with glowing blue nodes and data flow lines",
          src: "",
        },
        style: {
          width: "80%",
          margin: "2rem auto",
          borderRadius: "12px",
        },
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Two Column Comparison",
    description: "A two-column layout comparing two topics or ideas.",
    layoutType: "comparison",
    components: [
      {
        type: "multiColumn",
        children: [
          {
            type: "column",
            children: [
              { type: "heading2", content: "Traditional Systems" },
              {
                type: "bulletedList",
                content: [
                  "Rigid infrastructure",
                  "High maintenance costs",
                  "Limited scalability",
                ],
              },
            ],
          },
          {
            type: "column",
            children: [
              { type: "heading2", content: "Modern AI Systems" },
              {
                type: "bulletedList",
                content: [
                  "Adaptive and self-learning",
                  "Cloud-based scalability",
                  "Lower operational costs",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Image with Text",
    description:
      "A left-aligned image with descriptive text explaining a concept or process.",
    layoutType: "imageText",
    components: [
      {
        type: "imageAndText",
        children: [
          {
            type: "image",
            content: {
              alt: "AI-powered robotic hand reaching toward a holographic brain in a futuristic environment",
              src: "",
            },
            style: { width: "45%", borderRadius: "10px" },
          },
          {
            type: "paragraph",
            content:
              "Artificial Intelligence enhances automation, precision, and predictive capabilities across all industries.",
            style: { width: "50%", fontSize: "1rem", lineHeight: "1.5" },
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Quote Highlight",
    description:
      "A centered quote slide emphasizing a key message or inspirational thought.",
    layoutType: "quote",
    components: [
      {
        type: "blockquote",
        content:
          "“The future belongs to those who understand how to harness the power of AI.”",
        style: {
          textAlign: "center",
          fontStyle: "italic",
          fontSize: "1.75rem",
          margin: "2rem 0",
        },
      },
      {
        type: "paragraph",
        content: "– Tsvetan Markov, Web Developer",
        style: {
          textAlign: "center",
          fontSize: "1rem",
          color: "#999",
        },
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Data Table",
    description:
      "Displays structured data such as metrics, comparisons, or KPIs.",
    layoutType: "data",
    components: [
      {
        type: "table",
        content: JSON.stringify({
          headers: ["Category", "2023", "2024", "2025"],
          rows: [
            ["AI Investment", "$2B", "$3.5B", "$5B"],
            ["Adoption Rate", "25%", "40%", "65%"],
            ["Efficiency Gain", "10%", "22%", "35%"],
          ],
        }),
        style: { width: "100%", margin: "auto" },
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Call to Action",
    description:
      "Encourages audience engagement or participation with a clear call to action.",
    layoutType: "cta",
    components: [
      {
        type: "heading2",
        content: "Ready to Build with AI?",
        style: {
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
        },
      },
      {
        type: "paragraph",
        content:
          "Join thousands of developers shaping the future of automation and creativity.",
        style: { textAlign: "center", fontSize: "1.1rem", color: "#666" },
      },
      {
        type: "image",
        content: {
          alt: "Group of diverse professionals collaborating around laptops with AI holograms displayed",
          src: "",
        },
        style: {
          width: "60%",
          margin: "1.5rem auto",
          borderRadius: "10px",
        },
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Progress Overview",
    description:
      "A numbered list layout ideal for visualizing sequential progress or workflows.",
    layoutType: "list",
    components: [
      {
        type: "heading3",
        content: "AI Implementation Steps",
        style: { fontSize: "1.5rem", marginBottom: "1rem" },
      },
      {
        type: "numberedList",
        content: [
          "Identify business challenges",
          "Collect and preprocess data",
          "Train machine learning models",
          "Deploy and monitor solutions",
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Callout Box Highlight",
    description:
      "Highlights a key insight in a visually distinct box to capture audience attention.",
    layoutType: "highlight",
    components: [
      {
        type: "calloutBox",
        content:
          "AI-driven analytics can reduce operational costs by up to 40% when implemented effectively.",
        style: {
          backgroundColor: "#f0f8ff",
          borderLeft: "6px solid #0070f3",
          padding: "1.5rem",
          borderRadius: "8px",
          fontSize: "1rem",
        },
      },
    ],
  },
];
