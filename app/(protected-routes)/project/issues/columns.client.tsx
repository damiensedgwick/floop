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
          <ArrowsUpDownIcon width={12} height={12} className="w-4 h-4 ml-2" />
        </Button>
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
      const rating = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon width={20} height={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(rating.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Add label
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Follow up
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Forward on
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
