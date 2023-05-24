import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import classNames from "@/lib/classnames";
import MobileMenu from "@/components/mobile-menu.client";

const navigation = [
  {
    name: "Dashboard",
    href: "/organisation",
    icon: HomeIcon,
    current: true,
  },
  {
    name: "Ratings",
    href: "/organisation/ratings",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Issues",
    href: "/organisation/issues",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Suggestions",
    href: "/organisation/suggestions",
    icon: CalendarIcon,
    current: false,
  },
];

const organisation = [
  {
    id: 1,
    name: "Users",
    href: "/organisation/users",
    initial: "U",
    current: false,
  },
  {
    id: 2,
    name: "Settings",
    href: "/organisation/settings",
    initial: "S",
    current: false,
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

  return (
    <>
      {/* Dynamic sidebar for mobile*/}
      <MobileMenu />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 my-4 shrink-0 items-center">
            <Image
              className="mt-4"
              src="/floop-logo.png"
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
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-teal-600"
                            : "text-gray-700 hover:text-teal-600 hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-teal-600"
                              : "text-gray-400 group-hover:text-teal-600",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
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
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-teal-600"
                            : "text-gray-700 hover:text-teal-600 hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <span
                          className={classNames(
                            item.current
                              ? "text-teal-600 border-teal-600"
                              : "text-gray-400 border-gray-200 group-hover:border-teal-600 group-hover:text-teal-600",
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                          )}
                        >
                          {item.initial}
                        </span>
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <Link
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                >
                  <Image
                    className="rounded-full bg-gray-50"
                    src=""
                    alt=""
                    width={42}
                    height={42}
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">Damien Sedgwick</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
