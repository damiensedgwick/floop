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

  const { title, message, user_email } = await request.json();

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

  const record = await prisma.issues.create({
    data: {
      project_id: project_id,
      title: title,
      message: message ?? "---",
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
