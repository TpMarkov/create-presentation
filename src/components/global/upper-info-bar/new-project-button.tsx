"use client";
import { Button } from "@/components/ui/button";
import usePromptStore from "@/store/usePormptStore";
import { User } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();
  const { setPage } = usePromptStore();

  //WIP: handle click new Project
  const handleClick = () => {
    setPage("create");
    router.push("/create-page");
  };
  return (
    <Button
      className="rounded-lg font-semibold hover:cursor-pointer"
      disabled={!user.subscription}
      onClick={handleClick}
    >
      <PlusIcon />
      New Project
    </Button>
  );
};

export default NewProjectButton;
