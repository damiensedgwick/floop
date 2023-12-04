"use client";

import { Fragment, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { clsx } from "clsx";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import Container from "@/components/shared/container";

function MobileNavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-accent-foreground fill-none"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0",
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0",
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex items-center justify-center w-8 h-8 ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 flex flex-col p-4 mt-4 text-lg tracking-tight origin-top bg-white shadow-xl top-full rounded-2xl text-slate-900 ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#getting-started">
              Getting Started
            </MobileNavLink>
            <MobileNavLink href="#widget-preview">Floop Widget</MobileNavLink>
            <MobileNavLink href="#faqs">FAQs</MobileNavLink>
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href="/project">Flood Dashboard</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export default function Header() {
  return (
    <header className="py-6 md:py-8 lg:py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center lg:gap-x-10">
            <Link href="#" aria-label="Home">
              <Image
                src="/mint-floop.png"
                alt="Floop logo"
                width={100}
                height={100}
              />
            </Link>
            <div className="hidden lg:flex lg:gap-x-4">
              <Link href="#features">Features</Link>
              <Link href="#getting-started">Getting Started</Link>
              <Link href="#widget-preview">Floop Widget</Link>
              <Link href="#faqs">FAQs</Link>
              <Link href="/posts">Articles</Link>
            </div>
          </div>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="hidden lg:block">
              <Link
                className={buttonVariants({ variant: "mint" })}
                href="/project"
              >
                Floop Dashboard
              </Link>
            </div>
            <ThemeToggle />
            <div className="-mr-1 lg:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
