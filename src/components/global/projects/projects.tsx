"use client";
import { containerVariants } from "@/lib/constants";
import { Project } from "@prisma/client";
import { motion } from "framer-motion";
import ProjectCard from "./project-card";

type Props = {
  projects: Project[];
};
const Projects = ({ projects }: Props) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      initial="hidden"
      variants={containerVariants}
      animate="visible"
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          projectId={project?.id}
          title={project?.title}
          createAt={project?.createdAt}
          isDeleted={project?.isDeleted}
          slideData={project?.slides}
          src={
            project.thumbnail ||
            "https://plus.unsplash.com/premium_photo-17299004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&exid=M3wxMjA3fDb8MHxwaG90by1wYWdlfHx8fDB8fHx8fA%3D%3D"
          }
        />
      ))}
    </motion.div>
  );
};

export default Projects;
