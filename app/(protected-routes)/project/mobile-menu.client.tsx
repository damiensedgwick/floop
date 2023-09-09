"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import NavigationLink from "@/app/(protected-routes)/project/navigation-link.client";
import LogoutButton from "@/components/logout-button.client";
import { Button } from "@/components/ui/button";
import Close from "@/components/icons/x-close";
import Menu from "@/components/icons/menu";

type Props = {
  navigation: { name: string; href: string; icon: React.JSX.Element }[];
  userEmail: string;
};

export default function MobileMenu({ navigation }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-950/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1 bg-background">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <Close
                        className="h-8 w-8 stroke-white stroke-2 fill-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 pt-8">
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li
                              key={item.name}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <NavigationLink
                                href={item.href}
                                name={item.name}
                                icon={item.icon}
                              />
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="sticky top-0 z-40 flex items-center justify-between gap-x-6 px-4 py-4 shadow bg-background sm:px-6 lg:hidden">
        <div className="flex items-center space-x-4">
          <Image src="/mint-icon.svg" width={36} height={36} alt="Floop icon" />
          <Button
            onClick={() => setSidebarOpen(true)}
            variant="ghost"
            size="icon"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu
              className="w-24 h-24 fill-none stroke-2 stroke-accent-foreground"
              aria-hidden="true"
            />
          </Button>
        </div>
        <span className="sr-only">Logout</span>
        <LogoutButton />
      </div>
    </>
  );
}
