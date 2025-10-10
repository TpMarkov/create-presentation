"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthencticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, error: "User not authenticated" };
    }

    // Check for existing user by clerkId OR email
    let userExist = await client.user.findFirst({
      where: {
        OR: [
          { clerkId: user.id },
          { email: user.emailAddresses[0].emailAddress },
        ],
      },
      include: {
        PurchasedProjects: { select: { id: true } },
      },
    });

    // If exists, update clerkId if missing
    if (userExist) {
      if (!userExist.clerkId) {
        userExist = await client.user.update({
          where: { email: user.emailAddresses[0].emailAddress },
          data: { clerkId: user.id },
          include: {
            PurchasedProjects: { select: { id: true } },
          },
        });
      }
      return { status: 200, user: userExist };
    }

    // Otherwise create a new user
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        profileImage: user.imageUrl,
      },
    });

    return { status: 201, user: newUser };
  } catch (error) {
    console.error("Error in onAuthencticateUser:", error);
    return { status: 500, error: "Internal server error" };
  }
};
