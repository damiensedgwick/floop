"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  href: string;
  icon: React.JSX.Element;
};

export default function NavigationLink({ name, href, icon }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={`/project` + href}
      className={cn(
        "w-full",
        pathname.endsWith(href) || (pathname === "/project" && href === "/")
          ? buttonVariants({ variant: "secondary", size: "sm" })
          : buttonVariants({ variant: "ghost", size: "sm" }),
        "justify-start",
      )}
    >
      <span className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
        {icon}
      </span>
      <span>{name}</span>
    </Link>
  );
}
