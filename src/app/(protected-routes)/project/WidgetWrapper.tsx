"use client";

import { FloopWidget } from "@feedback-loop/react";

export default function WidgetWrapper() {
  return (
    <FloopWidget projectId="my-project-id">
      <button className="absolute right-12 opacity-50">Give feedback</button>
    </FloopWidget>
  );
}
