import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { DataTable } from "@/app/(protected-routes)/project/data-table.client";
import { columns } from "@/app/(protected-routes)/project/ratings/columns.client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { getRatings } from "@/app/(protected-routes)/project/ratings/ratings";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const ratings = await getRatings(project.id);

  if (!ratings?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 pt-2 sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold leading-6">
          <i>&ldquo;If you write zero tests, zero tests will fail.&ldquo;</i>
        </h1>
      </div>
    );
  }

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8 pb-16">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Ratings</h1>
          <Separator />
          <DataTable
            columns={columns}
            data={ratings}
            pageTitle="Ratings"
            filterColumn="details"
          />
        </div>
      </div>
    </div>
  );
}
