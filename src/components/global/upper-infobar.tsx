import { User } from "@prisma/client";
import React from "react";
import { SidebarSeparator, SidebarTrigger } from "../ui/sidebar";
import Searchbar from "./upper-info-bar/upper-info-searchbar";
import ThemeSwitcher from "./upper-info-bar/theme-switcher";
import { Button } from "../ui/button";
import { UploadIcon } from "lucide-react";
import NewProjectButton from "./upper-info-bar/new-project-button";

type Props = {
  user: User;
};

const UpperInfoBar = ({ user }: Props) => {
  return (
    <div className="flex flex-col w-full">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 p-4 border-b bg-background/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <SidebarSeparator orientation="vertical" className="h-4" />
        </div>
        <Searchbar />
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ThemeSwitcher />
          <Button
            variant={"outline"}
            className="rounded-lg  font-semibold hover:cursor-pointer"
          >
            <UploadIcon />
            Upload
          </Button>
          <NewProjectButton user={user} />
        </div>
      </header>
      <main className="p-4 w-full"></main>
    </div>
  );
};

export default UpperInfoBar;
