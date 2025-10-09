import { onAuthencticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  children: React.ReactNode;
};
const Layout = async ({ children }: Props) => {
  //   const recentProjects = await getRecentProjects();

  const chekcUser = await onAuthencticateUser();
  if (!chekcUser.user) {
    redirect("/sign-in");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  );
};

export default Layout;
