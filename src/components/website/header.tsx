import Image from "next/image";
import Link from "next/link";

type Props = {
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
};

export default function Header({ user }: Props) {
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
        <div className="flex flex-1 justify-end">
          {user ? (
            <a
              href="/organisation/dashboard"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Dashboard <span aria-hidden="true">&rarr;</span>
            </a>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
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
