import { auth } from "@clerk/nextjs";
import { prisma } from "./db";
import { redirect } from "next/navigation";

export const getUserByClerkId = async (params?: Parameters<(typeof prisma)["user"]["findUniqueOrThrow"]>[0]) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/new-user");
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
      ...(params || {}),
      where: {
        clerkId: userId,
      },
    });

    return user;
  } catch (error) {
    redirect("/new-user");
  }
};
