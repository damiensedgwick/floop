import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  RiErrorWarningLine,
  RiHome4Line,
  RiStarLine,
  RiTeamLine,
} from "react-icons/ri";
import styles from "@/styles/navigation.module.css";

export const Navigation = () => {
  const { logout } = useAuth();

  return (
    <nav className={styles.navigation}>
      <div>
        <h2 className={styles.brand}>Floop</h2>

        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} href="/dashboard">
              <RiHome4Line />
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/dashboard/feedback">
              <RiStarLine />
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/dashboard/issues">
              <RiErrorWarningLine />
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/dashboard/users">
              <RiTeamLine />
            </Link>
          </li>
        </ul>
      </div>

      <button className={styles.logout} onClick={logout}>
        Logout
      </button>
    </nav>
  );
};
