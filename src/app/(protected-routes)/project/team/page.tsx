import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
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
    </div>
  );
}
