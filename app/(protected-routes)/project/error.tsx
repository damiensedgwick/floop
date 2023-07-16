"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
      <div className="mx-auto max-w-3xl h-full">
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <h1 className="text-base font-semibold leading-6">
            Oops, something went wrong!
          </h1>

          <Button variant="default" size="lg" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
