import { prisma } from "@/lib/prisma";

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default async function Users({
  params,
}: {
  params: { organisation_id: string };
}) {
  const users = await prisma.public_users.findMany({
    where: {
      organisation_id: params.organisation_id,
    },
  });
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {users.map((user) => (
        <li
          key={user.email}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {user.name}
                </h3>
                <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {user.role}
                </span>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">
                {user.title}
              </p>
            </div>
            <Image
              className="flex-shrink-0 rounded-full bg-gray-300"
              src={user.image ?? ""}
              alt="User"
              width={60}
              height={60}
            />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${user.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Email
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
