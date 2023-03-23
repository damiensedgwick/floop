import type { NextPage } from "next";
import { Layout } from "@/components/layout";

const Login: NextPage = () => {
  return (
    <Layout>
      <main className="p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl text-center">Login page</h1>
        </div>
      </main>
    </Layout>
  );
};

export default Login;
