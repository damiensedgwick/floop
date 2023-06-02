import Image from "next/image";
import CreateOrganisationForm from "@/app/(authenticated-routes)/organisation/new/CreateOrganisationForm.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PublicUser } from "@/types";
import { redirect } from "next/navigation";

export default async function CreateOrganisation() {
  const session = await getServerSession(authOptions);

  let user: PublicUser;

  if (session) {
    user = await prisma.public_users.findFirst({
      where: {
        id: session?.user.id,
      },
    });
  }

  if (user?.organisation_id) {
    redirect(`/organisation/${user?.organisation_id}/dashboard`);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          src="/floop-logo.png"
          alt="Floop"
          width={128}
          height={128}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your organisation
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <CreateOrganisationForm />

        <p className="mt-10 text-center text-sm text-gray-500">
          If you are already a member of an organisation, for access, please
          speak to your organisation administrator.
        </p>
      </div>
    </div>
  );
}
