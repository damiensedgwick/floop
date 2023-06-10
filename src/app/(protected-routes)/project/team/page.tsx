export default async function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Team
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your team mates
          </p>
        </div>
      </div>
      <ul
        role="list"
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/*{users*/}
        {/*  .filter((user) => user.id !== session?.user?.id)*/}
        {/*  .map((user) => (*/}
        {/*    <li*/}
        {/*      key={user.email}*/}
        {/*      className="col-span-1 rounded-lg bg-white shadow divide-y divide-gray-200"*/}
        {/*    >*/}
        {/*      <div className="flex w-full items-center justify-between p-6 space-x-6">*/}
        {/*        <div className="flex-1 truncate">*/}
        {/*          <div className="flex items-center space-x-3">*/}
        {/*            <h3 className="truncate text-sm font-medium text-gray-900">*/}
        {/*              {user.name}*/}
        {/*            </h3>*/}
        {/*            <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 px-1.5 py-0.5">*/}
        {/*              {user.role ?? ""}*/}
        {/*            </span>*/}
        {/*          </div>*/}
        {/*          <p className="mt-1 truncate text-sm text-gray-500">*/}
        {/*            {user.title ?? ""}*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*        <Image*/}
        {/*          className="flex-shrink-0 rounded-full bg-gray-300"*/}
        {/*          src={user.image ?? ""}*/}
        {/*          alt="User"*/}
        {/*          width={60}*/}
        {/*          height={60}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*      <div>*/}
        {/*        <div className="-mt-px flex divide-x divide-gray-200">*/}
        {/*          <div className="flex w-0 flex-1">*/}
        {/*            <a*/}
        {/*              href={`mailto:${user.email}`}*/}
        {/*              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"*/}
        {/*            >*/}
        {/*              <EnvelopeIcon*/}
        {/*                className="h-5 w-5 text-gray-400"*/}
        {/*                aria-hidden="true"*/}
        {/*              />*/}
        {/*              Email*/}
        {/*            </a>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </li>*/}
        {/*  ))}*/}
      </ul>
    </div>
  );
}
