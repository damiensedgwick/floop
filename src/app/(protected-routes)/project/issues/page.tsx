import { auth } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { redirect } from "next/navigation";
import {
  getProject,
  getIssues,
} from "@/app/(protected-routes)/project/dashboard/page";

export default async function Page() {
  const { userId, getToken } = auth();

  const supabaseAccessToken = await getToken({ template: "supabase" });
  const sb = await supabase(supabaseAccessToken);

  const project = await getProject(sb, userId);

  if (!project) {
    redirect("/project/new");
  }

  const issues = await getIssues(sb, project.id);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Issues
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all issues submitted by your users
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="pr-3 pl-4 text-left text-sm font-semibold text-gray-900 py-3.5 sm:pl-6"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 text-left text-sm font-semibold text-gray-900 py-3.5"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="px-3 text-left text-sm font-semibold text-gray-900 py-3.5"
                    >
                      User Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {issues.map((issue) => (
                    <tr key={issue.id}>
                      <td className="whitespace-nowrap py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                        {issue.title}
                      </td>
                      <td className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {issue.message}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {issue.user_email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
