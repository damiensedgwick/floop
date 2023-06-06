import Link from "next/link";
import Image from "next/image";
import { PublicUser } from "@/types";

type Props = {
  user: PublicUser;
};

export default function Header({ user }: Props) {
  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/public" className="-m-1.5 p-1.5">
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
          {user && user?.project_id && (
            <Link
              href={`/project/${user?.project_id}/dashboard`}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Dashboard&nbsp;<span aria-hidden="true">&rarr;</span>
            </Link>
          )}

          {user && !user?.project_id && (
            <Link
              href="/project/new"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Create project&nbsp;<span aria-hidden="true">&rarr;</span>
            </Link>
          )}

          {!user && (
            <Link
              href="/api/auth/signin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sign in&nbsp;<span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
