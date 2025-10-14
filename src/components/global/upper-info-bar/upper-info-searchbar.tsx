import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const Searchbar = () => {
  return (
    <div className="relative flex w-full max-w-md items-center rounded-full bg-muted px-3 py-1.5">
      <Search className="absolute left-4 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search by title..."
        className="pl-10 pr-4 bg-transparent border-none shadow-none dark:bg-transparent outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
      />
      <Button
        size="sm"
        variant="ghost"
        className="ml-2 rounded-full hover:bg-muted-foreground/10 shadow-none"
      >
        Go
      </Button>
    </div>
  );
};

export default Searchbar;
