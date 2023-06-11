import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

type Props = {
  organisationId: string;
  invitationId: string;
  requestingUserId: string;
};

export default function CancelInvite({
  organisationId,
  invitationId,
  requestingUserId,
}: Props) {
  async function handleCancel() {
    "use server";

    try {
      await clerkClient.organizations.revokeOrganizationInvitation({
        organizationId: organisationId,
        invitationId: invitationId,
        requestingUserId: requestingUserId,
      });
    } catch (error) {
      throw new Error("Error revoking invitation: " + error);
    }

    revalidatePath("/project/team");
  }

  return (
    <form action={handleCancel}>
      <button
        type="submit"
        className="inline-flex flex-shrink-0 items-center rounded-full bg-red-50 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20 px-1.5 py-0.5"
      >
        Cancel
      </button>
    </form>
  );
}
