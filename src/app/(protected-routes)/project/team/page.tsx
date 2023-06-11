import Link from "next/link";
import { clerkClient, currentUser } from "@clerk/nextjs";

export default async function Page() {
  const user = await currentUser();

  const team = await clerkClient.organizations.getOrganizationMembershipList({
    organizationId: user?.publicMetadata.organisation_id as string,
  });

  console.log(team);

  const invitations =
    await clerkClient.organizations.getPendingOrganizationInvitationList({
      organizationId: user?.publicMetadata.organisation_id as string,
    });

  console.log(invitations);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Team
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {user?.publicMetadata.organisation_id
              ? "A list of all your team mates"
              : "You will need to create an organisation to create a team"}
          </p>
        </div>

        {!user?.publicMetadata.organisation_id ? (
          <Link
            href="/project/team/create-organisation"
            className="rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3.5 py-2.5 hover:bg-gray-50"
          >
            Create organisation
          </Link>
        ) : null}

        {!team.filter((member) => member.id === user?.id).length ? (
          <Link
            href="/project/team/invite-team-member"
            className="rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 px-3.5 py-2.5 hover:bg-gray-50"
          >
            Invite team member
          </Link>
        ) : null}
      </div>

      {invitations.length ? (
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {invitations.map((invite) => (
            <li
              key={invite.id}
              className="col-span-1 rounded-lg bg-white shadow divide-y divide-gray-200"
            >
              <div className="flex w-full items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {invite.emailAddress}
                      </h3>
                      <p className="mt-2 text-sm text-gray-700">
                        {invite.role === "basic_member" ? "Member" : "Admin"}
                      </p>
                    </div>
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 px-1.5 py-0.5">
                      Invitation pending
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {team.filter((member) => member.id === user?.id).length ? (
        <ul
          role="list"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        ></ul>
      ) : null}
    </div>
  );
}
