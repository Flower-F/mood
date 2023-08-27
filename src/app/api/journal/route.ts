import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();

  if (user?.id) {
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user?.id,
        content: "Write something about your day!",
      },
    });

    const analysis = await analyze({
      content: entry.content,
    });

    await prisma.analysis.create({
      data: {
        entryId: entry.id,
        mood: analysis?.mood ?? "",
        summary: analysis?.summary ?? "",
        color: analysis?.color ?? "#ffffff",
        negative: analysis?.negative ?? false,
        subject: analysis?.subject ?? "",
      },
    });

    revalidatePath("/journal");

    return NextResponse.json({ data: entry });
  }
};
