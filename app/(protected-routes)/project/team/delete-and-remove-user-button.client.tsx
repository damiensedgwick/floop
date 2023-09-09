"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  userId: string;
  onDeleteHandler: (userId: string) => void;
  disabled: boolean;
};

export default function DeleteAndRemoveUserButton({
  userId,
  onDeleteHandler,
  disabled,
}: Props) {
  return (
    <Button
      variant="destructive"
      type="button"
      onClick={() => onDeleteHandler(userId)}
      disabled={disabled}
      className="w-full space-x-1.5 md:max-w-[125px]"
    >
      <Trash />
      <span>Remove</span>
    </Button>
  );
}
