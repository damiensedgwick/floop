import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase as sb } from "@/lib/supabase";

export async function POST(request: Request) {
  const { project_id, email } = await request.json();

  const { data, error } = await sb.auth.admin.createUser({
    email,
  });

  if (error) {
    console.log("Error creating user: ", error.message);

    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 },
    );
  }

  if (!data.user) {
    console.log("No user data returned");

    return NextResponse.json(
      { message: "No user data returned" },
      { status: 500 },
    );
  }

  await sb
    .from("users")
    .update({
      project_id: project_id,
    })
    .match({ id: data.user.id });

  await sb.from("project_users").insert({
    project_id: project_id,
    user_id: data.user.id,
  });

  revalidatePath("/project/team");

  return NextResponse.json(
    { message: "Successfully created user" },
    { status: 200 },
  );
}
