import { Loader2Icon } from "lucide-react";
import React from "react";

const AuthLoading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2Icon className="animate-spin" />
    </div>
  );
};

export default AuthLoading;
