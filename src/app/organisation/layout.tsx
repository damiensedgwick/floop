import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LayoutProps } from "@/types";
import { Navigation, OrganisationNotFound } from "@/components/dashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib";

export default async function OrganisationLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const { user } = session;

  console.log(session);

  // grab the organisation based on user.id
  const organisation = null;

  if (!organisation) {
    return (
      <>
        <Navigation username={user.name} profilePicture={user.image} />
        <OrganisationNotFound />
      </>
    );
  }

  return (
    <div>
      <Navigation username={user.name} profilePicture={user.image} />

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
