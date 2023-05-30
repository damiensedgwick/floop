import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export default async function Issues() {
  const organisation_id = "cfa94faa-b73f-4683-8440-be083776a69a";

  const issues = await prisma.issues.findMany({
    where: {
      organisation_id: organisation_id,
    },
  });

  return (
    <div>
      {issues.map((issue) => (
        <p key={issue.id}>{issue.title}</p>
      ))}
    </div>
  );
}
