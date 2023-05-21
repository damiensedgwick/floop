import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OrganisationDashboard from "@/components/OrganisationDashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-full">
      <OrganisationDashboard user={session.user} />
    </main>
  );
}
