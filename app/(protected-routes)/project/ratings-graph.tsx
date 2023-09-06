import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  children: ReactNode;
};

export default async function RatingsGraph({ children }: Props) {
  return (
    <Card className="col-span-1 shadow xl:col-span-4">
      <CardHeader>
        <CardTitle>This Months Ratings</CardTitle>
        <CardDescription>
          How your ratings look for{" "}
          {new Date().toLocaleString("default", {
            month: "long",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
