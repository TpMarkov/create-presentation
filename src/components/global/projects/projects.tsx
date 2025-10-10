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
        <ProjectCard key={index} />
      ))}
    </motion.div>
  );
};

export default Projects;
