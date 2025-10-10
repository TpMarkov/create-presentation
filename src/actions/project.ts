"use server";

import { client } from "@/lib/prisma";
import { onAuthencticateUser } from "./user";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthencticateUser();
    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, error: "User not authenticated" };
    }
    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (projects.length === 0) {
      return { status: 404, error: "No projects found" };
    }

    return { status: 200, projects: projects };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500 };
  }
};

export const getRecentProjects = async () => {
  try {
    const checkUser = await onAuthencticateUser();

    if (checkUser.status !== 200 || !checkUser.user) {
      return { status: 403, data: [], error: "User not authenticated" };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user.id,
        isDeleted: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return {
      status: 200,
      data: projects.slice(0, 4),
      error: projects.length ? null : "No recent projects found",
    };
  } catch (error) {
    return { status: 500, data: [], error: error };
  }
};
