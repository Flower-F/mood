import { auth } from "@clerk/nextjs";
import Link from "next/link";

const HomePage = async () => {
  const { userId } = await auth();
  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
      <div className="mx-auto w-full max-w-[600px]">
        <h1 className="mb-4 text-6xl">The best journal app, period.</h1>
        <p className="mb-2 text-2xl text-white/60">
          This is the best app for tracking your mood through out your life. All you have to do si to be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-xl">get started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
