"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Database } from "@/types/supabase";
import {
  ArrowsUpDownIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
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

export const columns: ColumnDef<
  Database["public"]["Tables"]["ratings"]["Row"]
>[] = [
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          <ArrowsUpDownIcon width={12} height={12} className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = row.original;

      return (
        <div className="text-sm font-medium space-x-1.5">
          <span>{rating.score}</span>
          <span>/</span>
          <span>10</span>
        </div>
      );
    },
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => {
      const rating = row.original;

      return (
        <div className="text-sm font-medium space-x-1.5">
          <span>{rating.details || "----"}</span>
        </div>
      );
    },
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
          <ArrowsUpDownIcon width={12} height={12} className="ml-2 h-4 w-4" />
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
      const { id, user_email } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon width={20} height={20} />
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
              Add label
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Email user
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              View details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
