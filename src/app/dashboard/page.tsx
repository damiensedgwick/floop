import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center p-24">
      <p className="text-center mt-6">
        <i>This Dashboard route should be protected</i>
      </p>
    </main>
  );
}
