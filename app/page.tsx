import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Hero from "@/components/marketing-page/hero";
import Features from "@/components/marketing-page/features";
import Pricing from "@/components/marketing-page/pricing";
import Footer from "@/components/marketing-page/footer";
import GettingStarted from "@/components/marketing-page/getting-started";
import FAQ from "@/components/marketing-page/faq";

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
