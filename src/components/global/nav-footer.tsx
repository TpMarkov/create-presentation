"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded || !isSignedIn) {
    router.push("/sign-in");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!prismaUser.subscription && (
            <div className="flex flex-col items-start p-2 pb-3 gap-4 bg-background-8-">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-blue-400">Creative AI</span>
                </p>
                <span className="text-sm dark:text-muted-foreground">
                  Unlock all feautures including AI and more
                </span>
              </div>
              <div className="w-full p-[1px] rounded-lg">
                <Button
                  size="lg"
                  className="w-full rounded-lg font-bold text-white bg-transparent border border-transparent hover:cursor-pointer hover:opacity-90 transition-all duration-300"
                  style={{
                    borderImage:
                      "linear-gradient(to right, #60a5fa, #f472b6) 1",
                    borderRadius: "0px",
                  }}
                >
                  {loading ? "Upgrading..." : "Upgrade"}
                </Button>
              </div>
            </div>
          )}
          <SignedIn>
            <SidebarMenuButton className="size-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{user?.fullName}</span>
                <span className="truncate text-muted-foreground">
                  {user?.emailAddresses[0].emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
