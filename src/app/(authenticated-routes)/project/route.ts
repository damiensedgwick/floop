import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return createUnauthorisedResponse();
    }

    const { name } = await request.json();

    if (!name) {
      return createInvalidInputResponse("name");
    }

    const { user } = session;

    const record = await prisma.projects.create({
      data: {
        name: name,
        owner_id: user.id,
      },
    });

    await prisma.public_users.update({
      where: {
        id: user.id,
      },
      data: {
        project_id: record.id,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error:", error);

    return createInternalServerErrorResponse();
  }
}

function createUnauthorisedResponse() {
  return NextResponse.json({ message: "Unauthorised" }, { status: 403 });
}

function createInvalidInputResponse(input: string) {
  return NextResponse.json(
    { message: `Invalid input: ${input} is required` },
    { status: 400 }
  );
}

function createInternalServerErrorResponse() {
  return NextResponse.json(
    {
      message: "Internal Server Error",
    },
    {
      status: 500,
    }
  );
}
