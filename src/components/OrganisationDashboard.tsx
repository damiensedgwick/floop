"use client";

import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import classNames from "@/utils/classNames";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Ratings", href: "#", current: true },
  { name: "Issues", href: "#", current: false },
  { name: "Suggestions", href: "#", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/your-profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/api/auth/signout" },
];

type Props = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function OrganisationDashboard({ user }: Props) {
  return (
    <div className="min-h-full">
      <Popover as="header" className="bg-teal-600 pb-24">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative flex items-center justify-center py-5 lg:justify-between">
                <div className="absolute left-0 flex-shrink-0 lg:static">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Floop</span>
                    <Image
                      src="/floop-logo.png"
                      alt="Floop logo"
                      width={72}
                      height={72}
                    />
                  </Link>
                </div>
                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="rounded-full"
                          src={user.image || ""}
                          alt=""
                          width={48}
                          height={48}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="min-w-0 flex-1 pr-8 pl-14 lg:hidden">
                  <div className="mx-auto w-10/12 max-w-xs">
                    <label htmlFor="desktop-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative text-white focus-within:text-gray-600">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="desktop-search"
                        className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-transparent p-2 text-teal-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                <div className="grid grid-cols-3 items-center gap-8">
                  <div className="col-span-2">
                    <nav className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? "text-white" : "text-teal-100",
                            "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div>
                    <div className="mx-auto w-full max-w-md">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="mobile-search"
                          className="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Transition.Root as={Fragment}>
              <div className="lg:hidden">
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                  >
                    <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="pb-2 pt-3">
                        <div className="flex items-center justify-between px-4">
                          <div>
                            <Image
                              src="/floop-logo.png"
                              alt="Floop logo"
                              width={72}
                              height={72}
                            />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                              <span className="sr-only">Close menu</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                          <Link
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            Ratings
                          </Link>
                          <Link
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            Issues
                          </Link>
                          <Link
                            href="#"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          >
                            Suggestions
                          </Link>
                        </div>
                      </div>
                      <div className="pb-2 pt-4">
                        <div className="flex items-center px-5">
                          <div className="flex-shrink-0">
                            <Image
                              className="rounded-full"
                              src={user.image || ""}
                              alt=""
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="ml-3 min-w-0 flex-1">
                            <div className="truncate text-base font-medium text-gray-800">
                              {user.name}
                            </div>
                            <div className="truncate text-sm font-medium text-gray-500">
                              {user.email}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                          {userNavigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </div>
            </Transition.Root>
          </>
        )}
      </Popover>

      <main className="-mt-16 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Page title</h1>
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="section-2-title">
                <h2 className="sr-only" id="section-2-title">
                  Organisations latest submission
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow-xl">
                  <div className="p-6">
                    <p>Latest Rating / Issue / Suggestion based on page</p>
                  </div>
                </div>
              </section>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="section-1-title">
                <h2 className="sr-only" id="section-1-title">
                  All organisation submissions
                </h2>
                <div className="overflow-hidden rounded-lg bg-white shadow-xl">
                  <div className="p-6">
                    <p>
                      All Ratings / Issues / Suggestions in a table / something
                      pretty
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
            <span className="block sm:inline">&copy; 2023 Floop,&nbsp;</span>
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
