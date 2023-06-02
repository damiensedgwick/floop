import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  ChatBubbleLeftIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import MobileMenu from "@/app/(authenticated-routes)/organisation/[organisation_id]/MobileMenu.client";
import { prisma } from "@/lib/prisma";
import NavigationLink from "@/app/(authenticated-routes)/organisation/[organisation_id]/NavigationLink.client";

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

const organisation = [
  {
    name: "Users",
    href: "/users",
    initial: "U",
  },
  {
    name: "Settings",
    href: "/settings",
    initial: "S",
  },
];

export default async function OrganisationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.public_users.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div className="bg-white h-full">
      {/* Dynamic sidebar for mobile*/}
      <MobileMenu
        user={user}
        navigation={navigation}
        organisation={organisation}
      />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 my-4 shrink-0 items-center">
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
                      <NavigationLink user={user} item={item} />
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-400">
                  Your organisation
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {organisation.map((item) => (
                    <li key={item.name}>
                      <NavigationLink user={user} item={item} />
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <Link
                  href={`/organisation/${user?.organisation_id}/users/${user?.id}`}
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                >
                  <Image
                    className="rounded-full bg-gray-50"
                    src={user?.image || ""}
                    alt="Profile picture"
                    width={42}
                    height={42}
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{user?.name}</span>
                </Link>
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
