"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";

type Props = {
  children: ReactNode;
};

export default function AuthCheck({ children }: Props) {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return <></>;
  }
}
