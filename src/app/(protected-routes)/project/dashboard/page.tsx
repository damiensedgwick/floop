import { redirect } from "next/navigation";
import classNames from "@/lib/classnames";
import {
  getIssues,
  getProject,
  getRatings,
  getSuggestions,
} from "@/app/(protected-routes)/project/dashboard/actions";
import Link from "next/link";
import {
  ExclamationTriangleIcon,
  LightBulbIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import {
  getScoreBackgroundColor,
  getScoreTextColor,
} from "@/app/(protected-routes)/project/dashboard/helpers";

export default async function Page() {
  const project = await getProject();

  if (!project) {
    redirect("/project/new");
  }

  const [ratings, issues, suggestions] = await Promise.all([
    getRatings(project.id),
    getIssues(project.id),
    getSuggestions(project.id),
  ]);

  const ratingsWithType = ratings.map((item) => ({
    ...item,
    type: "rating" as const,
    icon: <StarIcon />,
    iconBackground: getScoreBackgroundColor(item.rating),
  }));

  const issuesWithType = issues.map((item) => ({
    ...item,
    type: "issue" as const,
    icon: <ExclamationTriangleIcon />,
    iconBackground: "bg-red-400",
  }));

  const suggestionsWithType = suggestions.map((item) => ({
    ...item,
    type: "suggestion" as const,
    icon: <LightBulbIcon />,
    iconBackground: "bg-amber-400",
  }));

  const timeline = [
    ...ratingsWithType,
    ...issuesWithType,
    ...suggestionsWithType,
  ];

  const stats = [
    { name: "Ratings", stat: ratings.length },
    { name: "Issues", stat: issues.length },
    { name: "Suggestions", stat: suggestions.length },
  ];

  const average30DayScore =
    ratings.length > 0
      ? Math.round(
          ratings.reduce((score, { rating }) => score + Number(rating), 0) /
            ratings.length
        )
      : 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            The most recent activities for your project
          </p>
        </div>
      </div>
      <h3 className="mt-6 text-base font-semibold leading-6 text-gray-900">
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
          <Link
            key={item.name}
            href={`/project/${item.name.toLowerCase()}`}
            className="cursor-pointer overflow-hidden rounded-lg bg-white px-4 py-5 shadow transition ease-in-out hover:shadow-2xl sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </Link>
        ))}
      </dl>

      <div className="py-8">
        <h3 className="my-6 text-base font-semibold leading-6 text-gray-900">
          Recent activity
        </h3>
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {timeline
              .sort(
                (a, b) =>
                  new Date(b.created_at ?? "").valueOf() -
                  new Date(a.created_at ?? "").valueOf()
              )
              .map((event, i) => {
                return (
                  <li key={event.id}>
                    <div className="relative pb-8">
                      {i !== timeline.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full bg-gray-200 w-0.5"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={classNames(
                              event.iconBackground,
                              "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                            )}
                          >
                            <span className="h-5 w-5 text-white">
                              {event.icon}
                            </span>
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <p className="text-sm text-gray-500">
                            New {event.type}:&nbsp;
                            <span className="font-medium text-gray-900">
                              {event.type === "rating"
                                ? event.rating
                                : event.title}
                            </span>
                          </p>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={event.created_at ?? ""}>
                              {format(
                                new Date(event.created_at ?? ""),
                                "dd MMM yy"
                              )}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
              .slice(0, 10)}
          </ul>
        </div>
      </div>
    </div>
  );
}
