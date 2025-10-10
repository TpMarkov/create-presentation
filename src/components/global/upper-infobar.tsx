import { User } from "@prisma/client";
import React from "react";
import { SidebarSeparator, SidebarTrigger } from "../ui/sidebar";
import Searchbar from "./upper-info-bar/upper-info-searchbar";
type Props = {
  user: User;
  children: React.ReactNode;
};
const UpperInfoBar = ({ user, children }: Props) => {
  return (
    <header className="sticky w-full top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2 p-4 justify-between">
      <SidebarTrigger className="-ml-1" />
      <SidebarSeparator orientation="vertical" className="mr-2 h-4" />
      <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
        <Searchbar />
      </div>
    </header>
  );
};

export default UpperInfoBar;
