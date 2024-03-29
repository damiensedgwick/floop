"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import MinusCircle from "@/components/icons/minus-circle";

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
      variant="ghost"
      type="button"
      size="tiny"
      onClick={() => onDeleteHandler(userId)}
      disabled={disabled}
    >
      <MinusCircle className="w-5 h-5 stroke-2 stroke-destructive fill-none" />
    </Button>
  );
}
