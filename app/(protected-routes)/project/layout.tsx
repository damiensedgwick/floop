import { ReactNode } from "react";
import Image from "next/image";
import {
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import NavigationLink from "@/app/(protected-routes)/project/NavigationLink.client";
import MobileMenu from "@/app/(protected-routes)/project/MobileMenu.client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon />,
  },
  {
    name: "Ratings",
    href: "/ratings",
    icon: <StarIcon />,
  },
  {
    name: "Issues",
    href: "/issues",
    icon: <ExclamationTriangleIcon />,
  },
  {
    name: "Suggestions",
    href: "/suggestions",
    icon: <ChatBubbleLeftIcon />,
  },
];

const project_links = [
  {
    name: "Settings",
    href: "/settings",
    initial: "S",
  },
  {
    name: "Team",
    href: "/team",
    initial: "T",
  },
];

export default async function ProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="h-full bg-white">
      {/* Dynamic sidebar for mobile*/}
      <MobileMenu navigation={navigation} project={project_links} />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col px-6 overflow-y-auto bg-white border-r border-gray-200 grow gap-y-5">
          <div className="flex items-center h-16 my-4 shrink-0">
            <Image
              className="mt-4"
              src="/floop-logo.png"
              alt="Your Company"
              width={72}
              height={72}
              priority
            />
          </div>
          <nav className="flex flex-col flex-1">
            <ul role="list" className="flex flex-col flex-1 gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavigationLink
                        name={item.name}
                        href={item.href}
                        icon={item.icon}
                      />
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="relative mb-2">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 text-sm text-gray-500 bg-white">
                      Project
                    </span>
                  </div>
                </div>

                <ul role="list" className="mt-2 -mx-2 space-y-1">
                  {project_links.map((item) => (
                    <li key={item.name}>
                      <NavigationLink
                        name={item.name}
                        href={item.href}
                        initial={item.initial}
                      />
                    </li>
                  ))}
                </ul>
              </li>
              <li className="flex items-center justify-between px-6 py-3 mt-auto -mx-6 text-sm font-semibold leading-6 text-gray-900 gap-x-4 hover:bg-gray-50">
                <NavigationLink name="Profile" href="/profile" initial="P" />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
