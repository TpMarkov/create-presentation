"use client";
import { JsonValue } from "@prisma/client/runtime/library";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { itemVariants, themes } from "@/lib/constants";
import { useSlideStore } from "@/store/useSlideStore";
import { useRouter } from "next/navigation";
import ThumnailPreview from "./thumnail-preview";
import { timeAgo } from "@/lib/utils";
import AlertDialogBox from "../alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProject, recoverProject } from "@/actions/project";

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted?: boolean;
  themeName: string;
  slideData: JsonValue;
};

const ProjectCard = ({
  createdAt,
  projectId,
  title,
  slideData,
  isDeleted,
  themeName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSlides } = useSlideStore();

  const router = useRouter();

  const theme = themes.find((theme) => theme.name === themeName || themes[0]);

  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    if (!projectId) {
      toast("Error:", {
        description: "Project not found",
      });
      setLoading(false);
      setOpen(false);
      return;
    }

    try {
      const response = await recoverProject(projectId);
      if (response.status !== 200) {
        toast.error("Oppse!:", {
          description: response.error || "Something went wrong",
        });
      }

      router.refresh();
      toast.success("Success:", {
        description: "Project recovered successfully",
      });

      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Oppse!:", {
        description: "Something went wrong. Please contact support",
      });
      setLoading(false);
      setOpen(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error("Error", {
        description: "Project not found",
      });
      setOpen(false);
      return;
    }

    try {
      const res = await deleteProject(projectId);

      if (res.status !== 200) {
        toast.error("Oppse!", {
          description: res.error || "Failed to delete project",
        });
        return;
      }

      setLoading(false);
      setOpen(false);
      toast.success("Deleted", {
        description: "Project deleted successfully",
      });

      router.refresh();
    } catch (error) {
      setLoading(false);
      toast.error("Oppse!", {
        description: "Failed to delete project",
      });
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`group w-full flex fled-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
    >
      <div
        className="relative aspec-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        {/* <ThumnailPreview
          // WIP: Add the slide data
          slide={JSON.parse(JSON.stringify(slideData)?.[0])}
          theme={theme}
        /> */}
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}This is the title that i want to see
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              suppressHydrationWarning
              className="text-sm text-muted-foreground"
            >
              {timeAgo(createdAt)}
            </p>
            {isDeleted ? (
              <AlertDialogBox
                description="This will recover your project and restore your data"
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant={"ghost"}
                  className="bg-background-80 dark:hover:bg-background-90"
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will recover your project and restore your data"
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-reds-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant={"destructive"}
                  className=""
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
