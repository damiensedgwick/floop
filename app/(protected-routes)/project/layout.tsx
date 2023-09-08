import { ReactNode } from "react";
import Image from "next/image";
import {
  ChatBubbleLeftIcon,
  Cog8ToothIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  StarIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import NavigationLink from "@/app/(protected-routes)/project/navigation-link.client";
import MobileMenu from "@/app/(protected-routes)/project/mobile-menu.client";
import LogoutButton from "@/components/logout-button.client";
import { getPublicUser } from "./utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: <HomeIcon width={24} height={24} />,
  },
  {
    name: "Ratings",
    href: "/ratings",
    icon: <StarIcon width={24} height={24} />,
  },
  {
    name: "Issues",
    href: "/issues",
    icon: <ExclamationTriangleIcon width={24} height={24} />,
  },
  {
    name: "Suggestions",
    href: "/suggestions",
    icon: <ChatBubbleLeftIcon width={24} height={24} />,
  },
  // TODO: Add these pages during BETA launch
  // {
  //   name: "Reports",
  //   href: "/reports",
  //   icon: <ExclamationTriangleIcon width={24} height={24} />,
  // },
  {
    name: "Team",
    href: "/team",
    icon: <UsersIcon width={24} height={24} />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <UserCircleIcon width={24} height={24} />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Cog8ToothIcon width={24} height={24} />,
  },
];

export const dynamic = "force-dynamic";

export default async function ProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getPublicUser();

  return (
    <div className="h-full">
      {/* Dynamic sidebar for mobile*/}
      <MobileMenu navigation={navigation} userEmail={user.email} />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6">
          <div className="mt-6 flex h-16 shrink-0 items-center justify-center">
            <Image
              className="mt-4"
              src="/mint-floop.svg"
              alt="Your Company"
              width={150}
              height={100}
              priority
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <div className="mb-2 text-xs font-semibold leading-7 text-gray-400">
                  Navigation
                </div>

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
              <li className="-mx-6 mt-auto flex items-center justify-between gap-x-4 px-6 py-3 text-sm font-semibold leading-7">
                <LogoutButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="h-full lg:pl-72">
        <div className="min-h-full pt-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
