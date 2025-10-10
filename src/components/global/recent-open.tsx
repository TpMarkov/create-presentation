"use client";
import React, { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { Project } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects = [] }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      toast.error("Project not found", {
        description: "Please try again",
      });
      return;
    }

    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Open</SidebarGroupLabel>
      <SidebarMenu>
        {
          recentProjects.length > 0
            ? recentProjects.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="hover:bg-primary-80"
                  >
                    <Button
                      variant="link"
                      onClick={() => handleClick(item.id, item.slides)}
                      className="text-xs items-center justify-start"
                    >
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            : ""
          // <SidebarMenuItem>
          //   <span className="text-xs text-muted-foreground">
          //     No recent projects
          //   </span>
          // </SidebarMenuItem>
        }
      </SidebarMenu>
    </SidebarGroup>
  );
};
export default RecentOpen;
