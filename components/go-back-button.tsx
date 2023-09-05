"use client";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className={buttonVariants({
        variant: "secondary",
        className: "mb-6",
      })}
    >
      Back
    </Button>
  );
}
