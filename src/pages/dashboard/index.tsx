import Head from "next/head";
import type { NextPage } from "next";
import { AdminLayout, GlobalLayout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";

const Dashboard: NextPage = () => {
  const { logout } = useAuth();

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

      <AdminLayout>
        <h1>Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </AdminLayout>
    </GlobalLayout>
  );
};

export default Dashboard;
