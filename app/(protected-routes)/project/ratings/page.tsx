import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Database } from "@/types/supabase";
import { DataTable } from "@/app/(protected-routes)/project/data-table.client";
import { columns } from "@/app/(protected-routes)/project/ratings/columns.client";
import React from "react";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: ratings } = await supabase
    .from("ratings")
    .select("*")
    .eq("project_id", project.id);

  if (!ratings?.length) {
    return (
      <div className="px-4 pt-2 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full">
        <h1 className="text-base font-semibold leading-6">
          <i>&ldquo;If you write zero tests, zero tests will fail.&ldquo;</i>
        </h1>
      </div>
    );
  }

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto space-y-3.5">
          <h1 className="text-base font-semibold leading-6">Ratings</h1>
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
