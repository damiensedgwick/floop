import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.public_users.findFirst({
    where: {
      id: session.user.id,
    },
  });

  redirect(`/organisation/${user?.organisation_id}/dashboard`);
}
