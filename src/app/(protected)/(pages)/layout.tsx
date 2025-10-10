import { getRecentProjects } from "@/actions/project";
import { onAuthencticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import UpperInfoBar from "@/components/global/upper-infobar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const layout = async ({ children }: Props) => {
  const recentProjects = await getRecentProjects();

  const checkUser = await onAuthencticateUser();

  if (!checkUser.user) redirect("/sign-in");
  return (
    <SidebarProvider>
      <AppSidebar
        user={checkUser.user}
        recentProjects={recentProjects.data || []}
      />
      <SidebarInset>
        <UpperInfoBar user={checkUser.user}>{children}</UpperInfoBar>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
