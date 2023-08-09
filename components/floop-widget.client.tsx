"use client";

import { FloopWidget } from "@feedback-loop/react";
import { Button } from "@/components/ui/button";

type Props = {
  projectId: string;
  userEmail: string;
};

export default function FloopWidgetButton({ projectId, userEmail }: Props) {
  return (
    <FloopWidget projectId={projectId} userEmail={userEmail}>
      <Button variant="themed" size="sm">
        Give Feedback
      </Button>
    </FloopWidget>
  );
}
