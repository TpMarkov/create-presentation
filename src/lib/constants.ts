import {
  BookTemplateIcon,
  HomeIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";

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
