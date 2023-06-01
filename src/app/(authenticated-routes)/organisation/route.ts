import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  const { name } = await request.json();

  const record = await prisma.organisations.create({
    data: {
      name: name,
      owner_id: session?.user.id,
    },
  });

  console.log(record);

  return NextResponse.json(record);
}
