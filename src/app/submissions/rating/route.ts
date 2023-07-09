import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export async function POST(request: Request): Promise<NextResponse | Response> {
  // Add the necessary CORS headers to allow requests from any website
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400", // 24 hours
  };

  if (request.method === "OPTIONS") {
    // Handle preflight OPTIONS request
    return new Response(null, { headers });
  }

  const { project_id, rating, message, user_email } = await request.json();

  // message is the only value allowed to be null here.
  if (!project_id || !rating || !user_email) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const sb = createClient<Database>(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_KEY)
  );

  const { error } = await sb.from("rating").insert({
    project_id: project_id,
    rating: rating,
    message: message.length ? message : "---",
    user_email: user_email,
  });

  if (error) {
    console.log(error);

    return NextResponse.json(
      { message: `Error ${error.message}` },
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ message: "Rating successfully submitted" }),
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      status: 201,
    }
  );
}
