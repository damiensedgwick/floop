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

export const columns: ColumnDef<
  Database["public"]["Tables"]["ratings"]["Row"]
>[] = [
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
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
        <div className="flex items-center justify-center space-x-1.5 text-sm font-medium">
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
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowsUpDownIcon width={12} height={12} className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "user_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Email
          <ArrowsUpDownIcon width={12} height={12} className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rating = row.original;

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
              onClick={() => navigator.clipboard.writeText(rating.id)}
            >
              Copy rating ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Send as email</DropdownMenuItem>
            <DropdownMenuItem>Respond to user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];