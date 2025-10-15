import React, { Suspense } from "react";
import CreatePageSkeleton from "./_components/createPage/CreatePageSkeleton";
import RenderPage from "./_components/RenderPage";
import { onAuthencticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const CreatePage = async () => {
  const checkUser = await onAuthencticateUser();

  if (!checkUser.user) {
    redirect("/sign-in");
  }

  if (!checkUser.user.subscription) {
    redirect("/dashboard");
  }

  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
};

export default CreatePage;
