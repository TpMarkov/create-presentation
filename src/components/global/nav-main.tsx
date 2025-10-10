"use client";
import React from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  items: {
    title: string;
    url: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
};

const NavMain = ({ items }: Props) => {
  const pathName = usePathname();

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathName.startsWith(item.url);
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`text-sm ${
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "hover:bg-muted"
                }`}
              >
                <Link href={item.url} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
