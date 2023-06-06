import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export default async function NotFound() {
  const session = await getServerSession(authOptions);

  const user = await prisma.public_users.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-teal-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we could not find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {session ? (
            <Link
              href={`/project/${user?.project_id}/dashboard`}
              className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/"
              className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Floop
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
