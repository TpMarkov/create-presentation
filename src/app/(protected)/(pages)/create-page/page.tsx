import React, { Suspense } from "react";
import CreatePageSkeleton from "./_components/createPage/CreatePageSkeleton";
import RenderPage from "./_components/RenderPage";

const CreatePage = () => {
  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  );
};

export default CreatePage;
