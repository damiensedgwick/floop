import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { DataTable } from "@/app/(protected-routes)/project/data-table.client";
import { columns } from "@/app/(protected-routes)/project/suggestions/columns.client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { getSuggestions } from "@/app/(protected-routes)/project/suggestions/suggestions";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const suggestions = await getSuggestions(project.id);

  if (!suggestions?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 pt-2 sm:px-6 lg:px-8">
        <h1 className="text-base font-semibold leading-6">
          <i>&ldquo;Live, laugh, copy & paste&ldquo;</i>
        </h1>
      </div>
    );
  }

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8 pb-16">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Suggestions</h1>
          <Separator />
          <DataTable
            columns={columns}
            data={suggestions}
            pageTitle="Suggestions"
            filterColumn="title"
          />
        </div>
      </div>
    </div>
  );
}
