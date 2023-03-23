import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import { Layout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";
import styles from "@/styles/Authentication.module.css";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const [existingUser, setExistingUser] = useState(false);
  const { register, login } = useAuth();

  return (
    <Layout>
      <main className={styles.main}>
        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();

            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;

            try {
              if (existingUser) {
                await login(email, password);
                await router.push("/dashboard");
              } else {
                await register(email, password);
                await router.push("/dashboard");
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <div className={styles.formHeader}>
            <h2>Floop</h2>
            <p>A feedback loop for your product</p>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="email">
              Email
            </label>
            <input
              className={styles.formInput}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="password">
              Password
            </label>
            <input
              className={styles.formInput}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button className={styles.formButton} type="submit">
            {existingUser ? "Login" : "Register"}
          </button>
          <div className={styles.formFooter}>
            <p>
              {existingUser
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setExistingUser(!existingUser)}
              >
                {existingUser ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default Login;
