import Link from "next/link";
import styles from "@/styles/navigation.module.css";

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <h2 className={styles.brand}>Floop</h2>

      <ul className={styles.navigationList}>
        <li className={styles.navigationListItem}>
          <Link href="/dashboard/feedback">Feedback</Link>
        </li>
        <li className={styles.navigationListItem}>
          <Link href="/dashboard/issues">Issues</Link>
        </li>
        <li className={styles.navigationListItem}>
          <Link href="/dashboard/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
};
