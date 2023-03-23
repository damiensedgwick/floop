import { ReactNode } from "react";
import { Navigation } from "@/components/navigation";

import styles from "@/styles/admin-layout.module.css";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.page}>{children}</div>
    </div>
  );
};
