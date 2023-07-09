"use client";

import { FloopWidget } from "@feedback-loop/react";

type Props = {
  userEmail: string | undefined;
};

export default function WidgetWrapper({ userEmail }: Props) {
  return (
    <FloopWidget
      projectId="fee40691-332e-4614-8d98-8009683c3187"
      userEmail={userEmail || ""}
    >
      <button className="absolute opacity-50 right-12">Give feedback</button>
    </FloopWidget>
  );
}
