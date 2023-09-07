import React from "react";
import { getProject } from "@/app/(protected-routes)/project/utils";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";
import { DataTable } from "@/app/(protected-routes)/project/data-table.client";
import { columns } from "@/app/(protected-routes)/project/suggestions/columns.client";

export default async function SuggestionsDataTable() {
  const project = await getProject();
  const suggestions = await getSuggestions(project.id);

  if (!suggestions?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 pt-2 sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7">
          <i>&ldquo;Live, laugh, copy & paste&ldquo;</i>
        </h1>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={suggestions}
      pageTitle="Suggestions"
      filterColumn="title"
    />
  );
}
