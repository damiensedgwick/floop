import React from "react";
import { DataTable } from "@/app/(protected-routes)/project/data-table.client";
import { columns } from "@/app/(protected-routes)/project/issues/columns.client";
import { getProject } from "@/app/(protected-routes)/project/utils";
import { getIssues } from "@/app/(protected-routes)/project/issues/issues";

export default async function IssuesDataTable() {
  const project = await getProject();
  const issues = await getIssues(project.id);

  if (!issues?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 pt-2 sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7">
          <i>&ldquo;Home is where the graphics card is&ldquo;</i>
        </h1>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={issues}
      pageTitle="Issues"
      filterColumn="title"
    />
  );
}
