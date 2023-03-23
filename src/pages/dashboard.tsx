import type { NextPage } from "next";
import { Layout } from "@/components/layout";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <main className="p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl text-center">Your Dashboard</h1>
          <p className="mt-4 text-lg text-center">
            ⚠️⚠️ This should be a protected route and only accessible when there
            is a user ⚠️⚠️
          </p>
        </div>
      </main>
    </Layout>
  );
};

export default Dashboard;
