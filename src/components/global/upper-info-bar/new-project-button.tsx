"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();

  //WIP: handle click new Project
  return (
    <Button
      className="rounded-lg font-semibold hover:cursor-pointer"
      disabled={!user.subscription}
      onClick={() => router.push("/create-page")}
    >
      <PlusIcon />
      New Project
    </Button>
  );
};

export default NewProjectButton;
