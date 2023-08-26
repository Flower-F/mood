import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

export const getUserByClerkId = async (params?: Parameters<(typeof prisma)["user"]["findUniqueOrThrow"]>[0]) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUniqueOrThrow({
    ...(params || {}),
    where: {
      clerkId: userId,
    },
  });

  return user;
};
