import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
