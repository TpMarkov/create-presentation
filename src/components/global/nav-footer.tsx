"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Button } from "../ui/button";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-4 items-start w-full group-data-[collapsible=icon]:hidden">
          {!prismaUser?.subscription && (
            <div className="flex flex-col items-start p-3 gap-3 rounded-md bg-muted">
              <div>
                <p className="text-sm font-bold">
                  Get{" "}
                  <span className="text-blue-400 font-bold">Creative AI</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Unlock all features including AI and more.
                </p>
              </div>
              <Button
                size="sm"
                className="w-full font-semibold text-white bg-gradient-to-r from-blue-500 to-pink-400 hover:cursor-pointer"
                disabled={loading}
              >
                {loading ? "Upgrading..." : "Upgrade"}
              </Button>
            </div>
          )}
          <SignedIn>
            <SidebarMenuButton className="w-full flex items-center gap-3 text-left">
              <UserButton />
              <div className="flex-1">
                <p className="truncate text-sm font-semibold">
                  {user?.fullName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
