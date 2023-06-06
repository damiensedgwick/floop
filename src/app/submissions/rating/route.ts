import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const headers = await request.headers;
  const bearer = headers.get("bearer");

  if (!bearer) {
    return NextResponse.json(
      {
        message: "Unauthorised",
      },
      {
        status: 403,
      }
    );
  }

  const decodedCredentials = atob(bearer);
  const [project_id, submission_secret] = decodedCredentials.split(":");

  const { rating, message, user_email } = await request.json();

  console.log(project_id);

  const project = await prisma.projects.findFirst({
    where: {
      id: project_id,
      submission_secret: submission_secret,
    },
  });

  if (!project) {
    return NextResponse.json(
      {
        message: "Unauthorised",
      },
      {
        status: 403,
      }
    );
  }

  const record = await prisma.ratings.create({
    data: {
      project_id: project_id,
      rating: rating,
      message: message.length ? message : "---",
      user_email: user_email,
    },
  });

  if (record) {
    return NextResponse.json(
      {
        message: "Successfully submitted",
      },
      {
        status: 200,
      }
    );
  }

  return NextResponse.json(
    {
      message: "Internal server error",
    },
    {
      status: 500,
    }
  );
}
