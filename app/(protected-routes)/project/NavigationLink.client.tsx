"use client";

import classNames from "@/lib/classnames";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type Props = {
  name: string;
  href: string;
  initial?: string;
  icon?: React.JSX.Element;
};

export default function NavigationLink({ name, href, initial, icon }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={`/project` + href}
      className={classNames(
        pathname.endsWith(href)
          ? "bg-gray-50 text-teal-600"
          : "text-gray-700 hover:text-teal-600 hover:bg-gray-50",
        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
      )}
    >
      {icon ? (
        <span
          className={classNames(
            pathname.endsWith(href)
              ? "text-teal-600"
              : "text-gray-400 group-hover:text-teal-600",
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[0.625rem] font-medium",
          )}
        >
          {icon}
        </span>
      ) : (
        <span
          className={classNames(
            pathname.endsWith(href)
              ? "text-teal-600 border-teal-600"
              : "text-gray-400 border-gray-200 group-hover:border-teal-600 group-hover:text-teal-600",
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white",
          )}
        >
          {initial}
        </span>
      )}

      <span className="truncate">{name}</span>
    </Link>
  );
}
