"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, parseISO } from "date-fns";
import SwitchVertical from "@/components/icons/switch-vertical";
import DotsHorizontal from "@/components/icons/dots-horizontal";

export const columns: ColumnDef<
  Database["public"]["Tables"]["issues"]["Row"]
>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "details",
      header: "Details",
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <SwitchVertical className="ml-2 h-4 w-4 stroke-2 fill-none stroke-muted-foreground" />
          </Button>
        );
      },
      cell: ({ row }) => {
        if (!row.original.created_at) {
          return <span></span>;
        }

        return (
          <span>{format(parseISO(row.original.created_at), "d MMM y")}</span>
        );
      },
    },
    {
      accessorKey: "user_email",
      header: "User",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const { id } = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontal className="stroke-2 fill-none stroke-accent-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(id)}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Email user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
