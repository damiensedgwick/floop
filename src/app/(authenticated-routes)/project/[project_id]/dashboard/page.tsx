import { prisma } from "@/lib/prisma";

export default async function Dashboard({
  params,
}: {
  params: { project_id: string };
}) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const ratings = await prisma.ratings.findMany({
    where: {
      AND: [
        {
          project_id: params.project_id,
        },
        {
          created_at: {
            gte: thirtyDaysAgo,
          },
        },
      ],
    },
  });

  const issues = await prisma.issues.findMany({
    where: {
      AND: [
        {
          project_id: params.project_id,
        },
        {
          created_at: {
            gte: thirtyDaysAgo,
          },
        },
      ],
    },
  });

  const suggestions = await prisma.suggestions.findMany({
    where: {
      AND: [
        {
          project_id: params.project_id,
        },
        {
          created_at: {
            gte: thirtyDaysAgo,
          },
        },
      ],
    },
  });

  const stats = [
    { name: "Ratings", stat: ratings.length },
    { name: "Issues", stat: issues.length },
    { name: "Suggestions", stat: suggestions.length },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Total submissions in the last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>

      {/* TODO: Some kind of ratings graph */}
      <div className="mx-auto my-8 max-w-7xl">
        <p>
          <i>Graph coming sooon...</i>
        </p>
      </div>
    </div>
  );
}
