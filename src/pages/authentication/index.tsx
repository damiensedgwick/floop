import Head from "next/head";
import type { NextPage } from "next";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { GlobalLayout } from "@/components/layout";
import styles from "@/styles/authentication.module.css";

const Login: NextPage = () => {
  const router = useRouter();
  const [existingUser, setExistingUser] = useState(false);
  const { register, login } = useAuth();

  return (
    <GlobalLayout>
      <Head>
        <title>Floop | A feedback loop for your product</title>
        <meta
          name="description"
          content="Floop enables your users to submit a rating and feedback, as well as issues for your product."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
                await router.push("/");
              } else {
                await register(email, password);
                await router.push("/");
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
    </GlobalLayout>
  );
};

export default Login;
