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
    icon: React.FC<React.SVGProps<SVGAElement>>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    };
  }[];
};
const NavMain = ({ items }: Props) => {
  const pathName = usePathname();
  return (
    <SidebarGroup className="p-0 mt-5">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={`${
                pathName.includes(item.url) && "bg-background-80" && "font-bold"
              }`}
            >
              <Link
                href={item.url}
                className={`text-lg ${pathName.includes(item.url)}`}
              >
                <item.icon className="text-lg" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
