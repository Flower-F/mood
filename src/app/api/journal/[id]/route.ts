import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const user = await getUserByClerkId();
  const { content } = await request.json();

  if (user?.id) {
    const updatedEntry = await prisma.journalEntry.update({
      where: {
        userId_id: {
          userId: user?.id,
          id: params.id,
        },
      },
      data: {
        content,
      },
    });

    return NextResponse.json({ data: updatedEntry });
  }
};
