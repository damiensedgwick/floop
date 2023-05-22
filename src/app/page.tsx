import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Header, Hero } from "@/components/header";
import { Features, Pricing, Product } from "@/components/features";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header user={session?.user} />

      <main>
        <Hero />
        <Product />
        <Features />
        <Pricing />
      </main>

      <footer>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
            <span className="block sm:inline">&copy; 2023 Floop,&nbsp;</span>
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
