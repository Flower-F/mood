import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-screen">
      <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/10">
        <div>Mood</div>
        <ul>
          {links.map((link) => {
            return (
              <li key={link.href} className="px-2 py-2 text-xl underline">
                <Link href={link.href}>{link.label}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-b-black/10">
          <div className="flex h-full w-full items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)] w-[calc(100vw-200px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
