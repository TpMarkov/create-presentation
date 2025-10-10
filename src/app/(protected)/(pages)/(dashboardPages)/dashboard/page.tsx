import { getAllProjects } from "@/actions/project";
import NotFound from "@/components/global/not-found";
import Projects from "@/components/global/projects/projects";
import React from "react";

const DashboardPage = async () => {
  const allProjects = await getAllProjects();

  return (
    <div className="flex w-full flex-col gap-6 relative p-4">
      <div className="flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
            Projects
          </h1>
          <p className="text-base font-normal dark:text-muted-foreground">
            All of your projects in one place
          </p>
        </div>
      </div>
      {/* Projects */}
      {allProjects.data && allProjects.data.length > 0 ? (
        <Projects />
      ) : (
        <div className="w-full min-h-screen justify-center items-center">
          <NotFound />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
