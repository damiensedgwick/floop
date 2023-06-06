import { prisma } from "@/lib/prisma";
import classNames from "@/lib/classnames";

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

  const average30DayScore =
    ratings.length > 0
      ? Math.round(
          ratings.reduce((score, { rating }) => score + Number(rating), 0) /
            ratings.length
        )
      : 0;

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

  function getScoreTextColor(score: number): string {
    switch (score) {
      case 1:
        return "text-red-500";
      case 2:
        return "text-orange-500";
      case 3:
        return "text-amber-500";
      case 4:
        return "text-lime-500";
      case 5:
        return "text-green-500";
      default:
        return "text-black";
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        In the last 30 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Average Floop score
          </dt>
          <dd
            className={classNames(
              getScoreTextColor(average30DayScore),
              "mt-1 text-3xl font-semibold tracking-tight text-gray-900"
            )}
          >
            {average30DayScore} / 5
          </dd>
        </div>
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
      <div className="py-8">
        <p>
          <i>Graph coming sooon...</i>
        </p>
      </div>
    </div>
  );
}
