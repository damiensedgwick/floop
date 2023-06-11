import { auth, clerkClient } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function submitForm(formData: FormData) {
  "use server";

  const { userId, getToken } = auth();

  if (!userId) {
    throw new Error("You must be signed in to create a project.");
  }

  const name = formData.get("name") as string;

  if (!name) {
    throw new Error("You must provide a name to create a project.");
  }

  try {
    await clerkClient.organizations.createOrganization({
      name: name,
      createdBy: userId,
    });
  } catch (error) {
    throw new Error(`Error creating organisation: ${error}`);
  }

  redirect("/project/team");
}
