"use client";

import { getProjectById } from "@/actions/project";
import { themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DndProvider } from "react-dnd";

type Props = {
  props: string;
};

const Page = ({ props }: Props) => {
  // WIP: Create the presentation View

  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme } = useTheme();
  const { currentTheme, setCurrentTheme, setProject, setSlides } =
    useSlideStore();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getProjectById(params.presentationId as string);

        if (res.status !== 200 || !res.data) {
          toast.error("Error:", { description: "Unable to fetch project" });
          redirect("/dashboard");
        }

        const findTheme = themes.find(
          (theme) => theme.name === res.data.themeName
        );

        setCurrentTheme(findTheme || themes[0]);
        setTheme(findTheme?.type === "dark" ? "dark" : "light");
        setProject(res.data);

        setSlides(JSON.parse(JSON.stringify(res.data.slides)));
      } catch (error) {
        console.error(error);
        toast.error("Error", { description: "An unexpected error occurred" });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [
    params.presentationId,
    setCurrentTheme,
    setIsLoading,
    setTheme,
    setProject,
    setSlides,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="animate-spin w-8 h-8 text-primary" />
        Loadign Project...
      </div>
    );
  }

  return <DndProvider></DndProvider>;
};

export default Page;
