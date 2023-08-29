"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  userId: string;
  onDeleteHander: (userId: string) => void;
};

export default function DeleteAndRemoveUserButton({
  userId,
  onDeleteHander,
}: Props) {
  return (
    <Button
      variant="destructive"
      size="tiny"
      type="button"
      onClick={() => onDeleteHander(userId)}
    >
      <TrashIcon width={16} height={16} />
    </Button>
  );
}
