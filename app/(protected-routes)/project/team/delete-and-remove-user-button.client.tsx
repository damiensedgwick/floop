"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

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
      className="w-full md:max-w-[125px] space-x-1.5"
    >
      <TrashIcon width={16} height={16} />
      <span>Remove</span>
    </Button>
  );
}
