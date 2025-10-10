"use client";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { Project } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects = [] }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const handleClick = (projectId: string, slides: any) => {
    if (!projectId || !slides) {
      toast.error("Project not found", { description: "Please try again." });
      return;
    }

    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Open</SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.length > 0 ? (
          recentProjects.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Button
                  variant="ghost"
                  onClick={() => handleClick(item.id, item.slides)}
                  className="text-sm w-full justify-start"
                >
                  {item.title}
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        ) : (
          <SidebarMenuItem>
            <span className="text-xs text-muted-foreground">
              No recent projects
            </span>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default RecentOpen;
