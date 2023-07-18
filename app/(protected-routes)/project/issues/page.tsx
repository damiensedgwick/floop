import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { DataTable } from "@/app/(protected-routes)/project/data-table.client";
import { columns } from "@/app/(protected-routes)/project/issues/columns.client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const issues = await getIssues(project.id);

  if (!issues?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 pt-2 sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold leading-6">
          <i>&ldquo;Home is where the graphics card is&ldquo;</i>
        </h1>
      </div>
    );
  }

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Issues</h1>
          <Separator />
          <DataTable
            columns={columns}
            data={issues}
            pageTitle="Issues"
            filterColumn="title"
          />
        </div>
      </div>
    </div>
  );
}
