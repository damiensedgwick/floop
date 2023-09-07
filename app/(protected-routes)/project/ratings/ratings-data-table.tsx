import { columns } from "@/app/(protected-routes)/project/ratings/columns.client";
import { DataTable } from "@/app/(protected-routes)/project/data-table.client";
import React from "react";
import { getProject } from "@/app/(protected-routes)/project/utils";
import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";

export default async function RatingsDataTable() {
  const project = await getProject();
  const ratings = await getRatings(project.id);

  if (!ratings?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 pt-2 sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7">
          <i>&ldquo;If you write zero tests, zero tests will fail.&ldquo;</i>
        </h1>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={ratings}
      pageTitle="Ratings"
      filterColumn="details"
    />
  );
}
