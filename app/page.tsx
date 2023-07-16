import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Hero from "@/app/hero";
import Features from "@/app/features";
import Pricing from "@/app/pricing";
import Footer from "@/app/footer";
import GettingStarted from "@/app/getting-started";
import FAQ from "@/app/faq";

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
