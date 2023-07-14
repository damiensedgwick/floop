import { checkUserAndProject } from "@/app/(protected-routes)/project/utils";

export default async function Page() {
  const { user, project } = await checkUserAndProject();

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Ratings
          </h1>
        </div>
      </div>
    </div>
  );
}
