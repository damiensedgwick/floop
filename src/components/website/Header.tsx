import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

type Props = {
  user: any;
};

// TODO: Make this type from prisma schema some how
// type User =

export default function Header({ user }: Props) {
  console.log(user);

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
              src="/floop-logo.png"
              alt="Floop logo"
              width={72}
              height={72}
            />
          </Link>
        </div>
        <div className="flex flex-1 justify-end">
          {/* TODO: Uncomment for launch */}
          {/*{public_user ? (*/}
          {/*  <Link*/}
          {/*    href={`/organisation/${public_user?.organisation_id}/dashboard`}*/}
          {/*    className="text-sm font-semibold leading-6 text-gray-900"*/}
          {/*  >*/}
          {/*    Dashboard <span aria-hidden="true">&rarr;</span>*/}
          {/*  </Link>*/}
          {/*) : (*/}
          {/*  <Link*/}
          {/*    href="/api/auth/signin"*/}
          {/*    className="text-sm font-semibold leading-6 text-gray-900"*/}
          {/*  >*/}
          {/*    Sign in <span aria-hidden="true">&rarr;</span>*/}
          {/*  </Link>*/}
          {/*)}*/}
        </div>
      </nav>
    </header>
  );
}
