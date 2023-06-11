import { auth, clerkClient, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { OrganizationMembershipRole } from "@clerk/backend";

export async function submitForm(formData: FormData) {
  "use server";

  const { userId, getToken } = auth();

  if (!userId) {
    throw new Error("You must be signed in to create a project.");
  }

  const email = formData.get("email") as string;
  const role = formData.get("role") as OrganizationMembershipRole;

  if (!email || !role) {
    throw new Error(
      "You must provide a name and role to invite a team member."
    );
  }

  const user = await currentUser();

  try {
    await clerkClient.organizations.createOrganizationInvitation({
      inviterUserId: user?.id as string,
      organizationId: user?.publicMetadata.organisation_id as string,
      emailAddress: email,
      role: role,
      redirectUrl: "/project/dashboard",
    });
  } catch (error) {
    throw new Error("Error creating organisation: " + error);
  }

  redirect("/project/team");
}
