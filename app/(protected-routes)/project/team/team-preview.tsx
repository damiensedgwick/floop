import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import {
  createServerComponentClient,
  getProject,
} from "@/app/(protected-routes)/project/utils";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

export default async function TeamPreview() {
  const project = await getProject();

  const supabase = createServerComponentClient();

  const { data: members } = await supabase
    .from("users")
    .select()
    .match({ project_id: project.id });

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {members
        ? members.map((member) => (
            <li
              key={member.email}
              className="col-span-1 rounded-lg border shadow divide-y bg-background"
            >
              <div className="flex w-full items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate space-y-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium">
                      {member.preferred_name || member.first_name || ""}
                    </h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 px-1.5 py-0.5">
                      {member.id === project.owner_id ? "Admin" : "Member"}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm">
                    {member.id === project.owner_id
                      ? "Founder at Floop"
                      : "Magnificent Member"}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${member.email}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
                    >
                      <EnvelopeIcon width={20} height={20} aria-hidden="true" />
                      Email
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold opacity-60"
                      disabled
                    >
                      <PhoneIcon height={20} width={20} aria-hidden="true" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
}
