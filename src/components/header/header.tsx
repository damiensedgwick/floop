"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Product", href: "#product" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Reviews", href: "#reviews" },
];

type Props = {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
};

export default function Hero({ user }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <Banner />
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
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
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md text-gray-700 -m-2.5 p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/*{user ? (*/}
          {/*  <a*/}
          {/*    href="/organisation"*/}
          {/*    className="text-sm font-semibold leading-6 text-gray-900"*/}
          {/*  >*/}
          {/*    My Organisation <span aria-hidden="true">&rarr;</span>*/}
          {/*  </a>*/}
          {/*) : (*/}
          {/*  <Link*/}
          {/*    href="/api/auth/signin"*/}
          {/*    className="text-sm font-semibold leading-6 text-gray-900"*/}
          {/*  >*/}
          {/*    Log in <span aria-hidden="true">&rarr;</span>*/}
          {/*  </Link>*/}
          {/*)}*/}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Floop</span>
              <Image
                src="/floop-logo.png"
                alt="Floop logo"
                width={72}
                height={72}
              />
            </Link>
            <button
              type="button"
              className="rounded-md text-gray-700 -m-2.5 p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {/*{user ? (*/}
                {/*  <a*/}
                {/*    href="/organisation"*/}
                {/*    className="text-sm font-semibold leading-6 text-gray-900"*/}
                {/*  >*/}
                {/*    My Organisation <span aria-hidden="true">&rarr;</span>*/}
                {/*  </a>*/}
                {/*) : (*/}
                {/*  <Link*/}
                {/*    href="/api/auth/signin"*/}
                {/*    className="text-sm font-semibold leading-6 text-gray-900"*/}
                {/*  >*/}
                {/*    Log in <span aria-hidden="true">&rarr;</span>*/}
                {/*  </Link>*/}
                {/*)}*/}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

function Banner() {
  return (
    <div className="bg-teal-600 px-6 py-2.5 sm:before:flex-1 sm:px-3.5">
      <p className="text-center text-sm leading-6 text-white">
        Floop is under active development and will be available soon!
      </p>
    </div>
  );
}
