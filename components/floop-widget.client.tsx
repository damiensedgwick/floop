"use client";

import { FloopWidget } from "@feedback-loop/react";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  projectId: string;
  userEmail: string;
  buttonType?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "mint"
    | "purple"
    | null
    | undefined;
};

export default function FloopWidgetButton({
  projectId,
  userEmail,
  buttonType,
}: Props) {
  return (
    <FloopWidget projectId={projectId} userEmail={userEmail}>
      <span
        className={buttonVariants({
          variant: buttonType ?? "outline",
          className: "mr-3",
        })}
      >
        Feedback
      </span>
    </FloopWidget>
  );
}
