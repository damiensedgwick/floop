import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserProfileForm from "@/app/(authenticated-routes)/project/[project_id]/users/[user_id]/UserProfileForm";

export default async function MyProfile() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin");
  }

  return <UserProfileForm name={user.name} image={user.image} />;
}
