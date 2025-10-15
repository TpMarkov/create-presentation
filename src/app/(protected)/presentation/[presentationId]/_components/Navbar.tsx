"use client";
import { Button } from "@/components/ui/button";
import { useSlideStore } from "@/store/useSlideStore";
import { HomeIcon, PlayIcon, Share, ShareIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { IoShareSocialOutline } from "react-icons/io5";

type Props = {
  presentationId: string;
};

const Navbar = ({ presentationId }: Props) => {
  const { currentTheme } = useSlideStore();
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/share/${presentationId}`
    );
    toast.success("Copied", { description: "Copied to clipboard" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 flex justify-between tiems-center py-4 px-7 border-b"
      style={{
        backgroundColor:
          currentTheme.navbarColor || currentTheme.backgroundColor,
        color: currentTheme.accentColor,
      }}
    >
      <Link href="/dashboard" passHref>
        <Button
          variant="outline"
          className="flex items-center gpa-2"
          style={{ backgroundColor: currentTheme.backgroundColor }}
        >
          <HomeIcon />
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>
      <Link
        href="/presentation/template-market"
        className="text-lg font-semibold hidden sm:block"
      >
        Presentation edtor
      </Link>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          style={{ backgroundColor: currentTheme.backgroundColor }}
          onClick={handleCopy}
        >
          <IoShareSocialOutline />
        </Button>
        {/* WIP : add lemosqueezy sell template */}
        {/* <SellTemplate /> */}
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <PlayIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>
      {/* Add presentation mode */}
      {/* {isPresentationMode && <PresentationMode />} */}
    </nav>
  );
};
export default Navbar;
