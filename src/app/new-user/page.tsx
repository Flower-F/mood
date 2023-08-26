import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createUser = async () => {
  const user = await currentUser();
  let match = null;

  if (user?.id) {
    match = await prisma.user.findUnique({
      where: {
        clerkId: user?.id,
      },
    });
  }

  if (!match && user?.id) {
    await prisma.user.create({
      data: {
        clerkId: user?.id,
        email: user.emailAddresses?.[0].emailAddress || "",
      },
    });
  }

  redirect("/journal");
};

const NewUserPage = async () => {
  await createUser();

  return <div>NewUser</div>;
};

export default NewUserPage;
