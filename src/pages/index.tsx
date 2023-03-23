import Head from "next/head";
import { Layout } from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Floop | A feedback loop for your product</title>
        <meta
          name="description"
          content="Floop enables your users to submit a rating and feedback, as well as issues for your product."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Floop</h1>
      </main>
    </Layout>
  );
}
