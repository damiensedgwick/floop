import { LayoutProps } from "@/types";
import { Navigation } from "@/components/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function OrganisationLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);

  const {
    user: { name, image },
  } = session!;

  return (
    <div>
      <Navigation username={name} profilePicture={image} />

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
