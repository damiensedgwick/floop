import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Floop</span>
            <Image
              src="/assets/floop-logo.png"
              alt="Floop logo"
              width={72}
              height={72}
            />
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          <ul className="flex items-center space-x-4">
            <li>
              <UserButton />
            </li>
            <li>
              <Link
                href="/(protected-routes)/project/dashboard"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Dashboard&nbsp;<span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
