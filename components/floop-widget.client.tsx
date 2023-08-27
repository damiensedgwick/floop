"use client";

import { FloopWidget } from "@feedback-loop/react";
import { Button, buttonVariants } from "@/components/ui/button";

type Props = {
  projectId: string;
  userEmail: string;
};

export default function FloopWidgetButton({ projectId, userEmail }: Props) {
  return (
    <FloopWidget projectId={projectId} userEmail={userEmail}>
      <span className={buttonVariants({ variant: "themed" })}>
        Give Feedback
      </span>
    </FloopWidget>
  );
}
