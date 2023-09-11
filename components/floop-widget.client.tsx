"use client";

import { FloopWidget } from "@feedback-loop/react";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  projectId: string;
  userEmail: string;
};

export default function FloopWidgetButton({ projectId, userEmail }: Props) {
  return (
    <FloopWidget projectId={projectId} userEmail={userEmail}>
      <span
        className={buttonVariants({ variant: "outline", className: "mr-3" })}
      >
        Feedback
      </span>
    </FloopWidget>
  );
}
