"use client";

import classNames from "@/lib/classnames";
import Link from "next/link";
import React, { SetStateAction } from "react";
import { usePathname } from "next/navigation";

type Props = {
  user: any;
  item: {
    name: string;
    href: string;
    initial?: string;
    icon?: React.JSX.Element;
  };
};

export default function NavigationLink({ user, item }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={`/organisation/${user?.organisation_id}` + item.href}
      className={classNames(
        pathname.endsWith(item.href)
          ? "bg-gray-50 text-teal-600"
          : "text-gray-700 hover:text-teal-600 hover:bg-gray-50",
        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
      )}
    >
      {item.icon ? (
        <span
          className={classNames(
            pathname.endsWith(item.href)
              ? "text-teal-600 border-0"
              : "text-gray-400 border-0 group-hover:text-teal-600",
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
          )}
        >
          {item.icon}
        </span>
      ) : (
        <span
          className={classNames(
            pathname.endsWith(item.href)
              ? "text-teal-600 border-teal-600"
              : "text-gray-400 border-gray-200 group-hover:border-teal-600 group-hover:text-teal-600",
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
          )}
        >
          {item.initial}
        </span>
      )}

      <span className="truncate">{item.name}</span>
    </Link>
  );
}
