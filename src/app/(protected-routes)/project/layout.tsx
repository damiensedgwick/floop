import { ReactNode } from "react";
import Image from "next/image";
import {
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { currentUser, UserButton } from "@clerk/nextjs";
import NavigationLink from "@/app/(protected-routes)/project/NavigationLink.client";
import MobileMenu from "@/app/(protected-routes)/project/MobileMenu.client";
import WidgetWrapper from "@/app/(protected-routes)/project/WidgetWrapper";
import { getProject } from "@/app/(protected-routes)/project/dashboard/actions";
import { redirect } from "next/navigation";

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
    name: "Team",
    href: "/team",
    initial: "T",
  },
  {
    name: "Settings",
    href: "/settings",
    initial: "S",
  },
];

export default async function ProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  const project = await getProject();

  if (!project) {
    redirect("/project/new");
  }

  const user = await currentUser();

  return (
    <div className="h-full bg-white">
      {/* Dynamic sidebar for mobile*/}
      <MobileMenu navigation={navigation} project={project_links} />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="my-4 flex h-16 shrink-0 items-center">
            <Image
              className="mt-4"
              src="/assets/floop-logo.png"
              alt="Your Company"
              width={72}
              height={72}
              priority
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
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
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your project
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
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
              <li className="-mx-6 mt-auto flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
                <UserButton />
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">
                  {user?.firstName} {user?.lastName}
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="py-10 lg:pl-72">
        {project.name === "Floop" ? (
          <div className="hidden lg:block lg:pr-12">
            <WidgetWrapper />
          </div>
        ) : null}

        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
