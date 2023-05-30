import { prisma } from "@/lib/prisma";

export default async function Issues({ params }: { params: { id: string } }) {
  const issues = await prisma.issues.findMany({
    where: {
      organisation_id: params.id,
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
