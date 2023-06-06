import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorised",
      },
      {
        status: 403,
      }
    );
  }

  const { user } = session;

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorised",
      },
      {
        status: 403,
      }
    );
  }

  const { name } = await request.json();

  const record = await prisma.projects.create({
    data: {
      name: name,
      owner_id: user.id,
    },
  });

  return NextResponse.json(record);
}
