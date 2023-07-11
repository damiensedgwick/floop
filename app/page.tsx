import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import GettingStarted from "@/components/GettingStarted";
import FAQ from "@/components/FAQ";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <GettingStarted />
      <FAQ />
      <Footer />
    </div>
  );
}
