import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function OrganisationNotFound() {
  return (
    <div>
      <main className="h-screen py-10 lg:pl-72">
        <div className="h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-semibold leading-7 text-gray-500">
            No organisation found
          </h2>
          <FaceFrownIcon className="my-4 text-gray-500" width={192} height={192} />
          <Link className="rounded-md bg-teal-600 text-sm font-semibold text-white shadow-sm px-3.5 py-2.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600" href="/organisation/create">
            Create organisation
          </Link>
        </div>
      </main>
    </div>
  )
}
