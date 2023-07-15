import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);

  console.log("project", project);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6">Ratings</h1>
        </div>
      </div>
    </div>
  );
}
