import { analyze } from "@/utils/ai";
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

    const analysis = await analyze({ content });

    await prisma.analysis.upsert({
      where: {
        entryId: params.id,
      },
      create: {
        entryId: updatedEntry.id,
        mood: analysis?.mood ?? "",
        summary: analysis?.summary ?? "",
        color: analysis?.color ?? "#ffffff",
        negative: analysis?.negative ?? false,
        subject: analysis?.subject ?? "",
      },
      update: analysis || {},
    });

    return NextResponse.json({ data: updatedEntry });
  }
};
