import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode[];
};

export default function MonthlyOverview({ children }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium leading-7">Monthly Overview</h2>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-7">{children}</div>
    </div>
  );
}
