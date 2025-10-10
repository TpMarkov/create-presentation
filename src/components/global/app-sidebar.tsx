"use client";
import { Project, User } from "@prisma/client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NavMain from "./nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";

const AppSidebar = ({
  recentProjects,
  user,
  ...props
}: {
  recentProjects: Project[];
  user: User;
} & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-background">
      {/* --- HEADER / LOGO --- */}
      <SidebarHeader className="pt-6 px-3 pb-2">
        <SidebarMenuButton
          size="lg"
          className="group flex items-start gap-3 data-[state=open]:justify-start justify-start"
        >
          {/* Centered + responsive logo */}
          <div className="flex items-center justify-center">
            <Avatar
              className="
                transition-all
                duration-300
                ease-in-out
                rounded-md
                group-data-[collapsible=icon]:h-7 
                group-data-[collapsible=icon]:w-7 
                h-9 w-9
              "
            >
              <AvatarImage src="/vivid.svg" alt="Vivid-logo" />
              <AvatarFallback>VI</AvatarFallback>
            </Avatar>
          </div>

          {/* Logo text - hidden when sidebar is collapsed */}
          <span
            className="
              truncate text-primary text-2xl font-semibold
              transition-opacity duration-300 
              group-data-[collapsible=icon]:opacity-0 
              group-data-[collapsible=icon]:hidden
            "
          >
            Vivid
          </span>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* --- NAVIGATION --- */}
      <SidebarContent className="px-2 mt-8 space-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>

      {/* --- FOOTER --- */}
      <SidebarFooter>
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
